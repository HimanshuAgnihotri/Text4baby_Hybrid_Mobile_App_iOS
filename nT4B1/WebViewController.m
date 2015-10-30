//
//  WebViewController.m
//  nT4B2
//
//  Created by Gustavo on 8/21/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "WebViewController.h"
#import "ExtBrowserViewController.h"
#import "MainTabBarController.h"
#import "Support.h"

@interface WebViewController ()
{
    errorAlertType alertType;

    NSString *pageName;
    NSString *pageLocation;

    UIActivityIndicatorView *spinner;
    UIViewController *vcWait;
}
@end

@implementation WebViewController

// load the view nib and initialize the pageNumber ivar
- (id)initWithPage:(NSString*)page Location:(NSString*)location
{
    if (self = [super initWithNibName:@"WebViewController" bundle:nil])
    {
        pageName = page;
//        pageName = @"xtest.html";
        pageLocation = location;
    }
    return self;
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    self.completedLoading = false; // Track if page has completed loading
    self.theWebView.delegate = self;
//    self.theWebView.backgroundColor = [UIColor whiteColor];
    self.theWebView.backgroundColor = [UIColor clearColor];

    // Show Please Wait screen
    vcWait = [Support getWaitViewControllerWithBackground:[UIColor clearColor]]; // Create "Please wait..." screen
//    UIWindow *topWindow = [[UIApplication sharedApplication] keyWindow];
//    UIViewController *rootView = [topWindow rootViewController];
//    [self.parentController.view addSubview:vcWait.view];
    self.view.frame = self.parentController.view.frame;
    [self.view addSubview:vcWait.view];
    CGRect frame = vcWait.view.frame;
    frame.size.height = CGRectGetHeight(frame)-369;
    [vcWait.view setFrame:frame];
    
    //load the internal page
    NSString *path = [[NSBundle mainBundle] pathForResource:pageName ofType:@"" inDirectory:pageLocation];
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
}

-(void)viewWillAppear:(BOOL)animated
{
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
    NSLog(@"********** WebViewController didReceiveMemoryWarning **********");
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"WebViewController -> shouldStartLoadWithRequest: %@", urlFileName);
//    [Support LogURL:request];
    if (urlFileName == nil) return YES; // If the page name is nil, this most likely an email or phone number link and will be allowed
    
    // Process notification of an API invocation
    if ([urlFileName isEqualToString: (@"DO.TX")])
    {
        NSLog(@"DO.TX");
        [Support ProcessAPIwithJSON:[request.URL.resourceSpecifier stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding]
                          onWebView:self.theWebView
                            showing:vcWait
                 overViewController:[Support getWindowRoot]]; //]self.navigationController];
        return NO; // Do not continue because wait screen will be removed
    }
    // if asked by html to remove wait screen, remove it
    if ([urlFileName isEqualToString: (@"iOS.nativeProgressBarHide")])
    {
        NSLog(@"vcWait.view removeFromSuperview");
        if (vcWait.view.superview != nil) [vcWait.view removeFromSuperview];
    }
    // If not doing any new transaction, remove wait screen (if visible) before evaluating any next actions
//    if (vcWait.view.superview != nil) [vcWait.view removeFromSuperview];
    
    // Look for error alerts triggered from JS
    if ([request.URL.path rangeOfString:@"error"].location != NSNotFound)
        alertType = [Support ProcessJSErrorsUsingURL:request andDelegate:self];
    
    
    if ([request.URL.scheme isEqualToString:@"http"] || [request.URL.scheme isEqualToString:@"https"])
    {
        ExtBrowserViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                        instantiateViewControllerWithIdentifier:@"ExtBrowserViewController"];
        vc.loadURLRequest = request;
        vc.modalPresentationStyle = UIModalPresentationFullScreen + UIModalPresentationOverFullScreen;
        vc.modalTransitionStyle  = UIModalTransitionStyleCoverVertical;
        UIWindow *topWindow = [[UIApplication sharedApplication] keyWindow];
        UIViewController *rootView = [topWindow rootViewController];
        [rootView presentViewController:vc animated:YES completion:NULL];
        return NO;
    }
    return YES;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    self.completedLoading = true;
    
    [Support disableWebLinkForWebView: self.theWebView];

    UIEdgeInsets insets;
    if (self.parentController.hasWeekNav)
        insets = UIEdgeInsetsMake ( 48, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom,
    else
        insets = UIEdgeInsetsMake ( 0, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, left, bottom, right )
    [self.theWebView.scrollView setContentInset:insets];
    [self.theWebView.scrollView setScrollIndicatorInsets:insets];

    // Align Accordions in case of late load
    NSString *js, *result;
    if (self.parentController.hasAccordions)
    {
        js = [self.parentController buildJSforAccordionAlignment];
        NSLog(@"FinishLoad %li: Expand JS-> %@", (long)self.week, js);
        result = [self.theWebView stringByEvaluatingJavaScriptFromString:js];

        if (self.parentController.vcProtocol == T4bProtocolPregnancy)
            js = [NSString stringWithFormat:@"updateResults(%i);", (int)(self.week + self.parentController.weekOffset)];
        else
            js = [NSString stringWithFormat:@"updateResultsBaby(%i);", (int)(self.week + self.parentController.weekOffset)];
        result = [self.theWebView stringByEvaluatingJavaScriptFromString:js];
    }
    // Align page vertical alignment in case of late load
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)),     dispatch_get_main_queue(), ^{
        NSString *js = [self.parentController buildJSforVerticalAlignment];
        NSLog(@"FinishLoad %li: Vertical Align JS-> %@", (long) self.week, js);
        [self.theWebView stringByEvaluatingJavaScriptFromString:js];
    });
/*
    UIEdgeInsets insets1 = UIEdgeInsetsMake ( 48, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom, CGFloat right );
    if (self.parentController.hasWeekNav)
    {
        [self.theWebView.scrollView setContentInset:insets1];
        [self.theWebView.scrollView setScrollIndicatorInsets: insets1];
    }
*/
    // Remove any wait message
    [vcWait.view removeFromSuperview];
    [(MainTabBarController*)(self.parentController.tabBarController) countWebCompletions]; // Used for initial UI preparation
}
@end
