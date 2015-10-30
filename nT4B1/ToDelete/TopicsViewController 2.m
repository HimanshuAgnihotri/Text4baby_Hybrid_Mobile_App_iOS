//
//  TimelineViewController.m
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "TopicsViewController.h"
#import "BrowserViewController.h"
#import "BrowserSwipeViewController.h"
#import "AppDelegate.h"
#import "MainTabBarController.h"
#import "Support.h"


@interface TopicsViewController ()
{
    BOOL currentScreen;
    AppDelegate *appdelegate;
    UIWebView *newWebView;
    UIWebView *newWebView2;
}

//@property (nonatomic, strong) NSMutableArray *swipeChildViewControllers; // *TopicsPregnancyViewControllers;
//@property (nonatomic, strong) NSMutableArray *swipeChildViewControllers2; // *TopicsPregnancyViewControllers;
@property (nonatomic, strong) NSArray *swipeChildContentList;  //*TopicsPregnancyContentList;
@property (nonatomic, strong) NSArray *swipeChildContentList2;  //*TopicsPregnancyContentList;

@end

@implementation TopicsViewController

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
    // Do any additional setup after loading the view.

    CGRect windowFrame = [[UIScreen mainScreen] bounds];

    // Web Browser dynamically created to stop fighting AutoLayout
    windowFrame.size.height -= 64;
    self.view.frame = windowFrame;
    self.view.backgroundColor = [UIColor whiteColor];

    self.theWebView = [[UIWebView alloc] initWithFrame:windowFrame];
    self.theWebView2 = [[UIWebView alloc] initWithFrame:windowFrame];
    [self.view addSubview:self.theWebView];
    [self.view addSubview:self.theWebView2];
    if ([[[UIDevice currentDevice] systemVersion] intValue] >= 7) // Use inset to display UIWebView under translucent tabbar on iOS 7+
    {
        UIEdgeInsets insets = UIEdgeInsetsMake ( 0, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom, CGFloat right );
        [self.theWebView.scrollView setContentInset:insets];
        [self.theWebView.scrollView setScrollIndicatorInsets:insets];
        [self.theWebView2.scrollView setContentInset:insets];
        [self.theWebView2.scrollView setScrollIndicatorInsets:insets];
    }
    CGRect frame = self.theWebView.frame;
    NSLog(@"theWebView Frame - X: %f, Y: %f, Width: %f, Height: %f", frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
    frame = self.theWebView2.frame;
    NSLog(@"theWebView2 Frame - X: %f, Y: %f, Width: %f, Height: %f", frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
    self.edgesForExtendedLayout = UIRectEdgeAll;
    
    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    self.theWebView.delegate = self;
    self.theWebView2.delegate = self;

//    self.theWebView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"iPadBackgroundTexture-grey.png"]];
    self.theWebView.backgroundColor = [UIColor whiteColor];
    self.theWebView2.backgroundColor = [UIColor whiteColor];

//    Turn off Bounce on Web
//    [[self.theWebView.subviews objectAtIndex:0] setBounces:NO];
    
    NSString *path, *path2;
    if ([self.title isEqual:@"Topics"])
    {
        NSLog(@"Preparing: Topics");
        // Pregnancy Topics
        path = [[NSBundle mainBundle] pathForResource:@"pregnancy-topics" ofType:@"html" inDirectory:@"www/topics/pregnancy"];
        // Load Pregnancy Swipe Content
        self.swipeChildContentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsPreg" ofType:@"plist"]];

        // Baby Timeline
        path2 = [[NSBundle mainBundle] pathForResource:@"baby-topics" ofType:@"html" inDirectory:@"www/topics/baby"];
        // Load Pregnancy Swipe Content
        self.swipeChildContentList2 = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsBaby" ofType:@"plist"]];
    }
    NSLog(@"Pregnancy path: %@", path);
    
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    // Disable user selection
//    [self.theWebView stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitUserSelect='none';"];
    // Disable callout
//    [self.theWebView stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitTouchCallout='none';"];

    currentScreen = YES;
    NSLog(@"New baby path2: %@", path2);
    [self.theWebView2 loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path2]]];

    [self updateProtocol];
    [self.navigationItem.backBarButtonItem setTitle: @""];

 }

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
//    [self updateProtocol];

}

- (IBAction)doBabyButton;
{
    [self switchProtocol];
}

- (void)switchProtocol
{
    NSLog(@"t4bprotocol: %i", (int) ((AppDelegate *)[UIApplication sharedApplication].delegate).visibleProtocol);

    if (appdelegate.visibleProtocol ==T4bProtocolPregnancy) // Pregnancy ?
    {
        appdelegate.visibleProtocol = T4bProtocolNewBaby;
        NSLog(@"Switch from Pregnancy to Baby");
    }
    else
    {
        appdelegate.visibleProtocol = T4bProtocolPregnancy;
        NSLog(@"Switch from Baby to Pregnancy");
    }
    // Update UI
    [self updateProtocol];
}


//*****************************************************************************************************************
//* Switch browsers between Pregnancy and New Baby based on global state (at AppDelegate level)
//* Animate the transition
//*****************************************************************************************************************
- (void)updateProtocol
{
    UIViewAnimationOptions aniType = UIViewAnimationOptionShowHideTransitionViews;
    
    if (appdelegate.visibleProtocol==T4bProtocolPregnancy) // On Pregnancy ?
    {
//        [self.view bringSubviewToFront:self.theWebView2];
        aniType += UIViewAnimationOptionTransitionCurlDown;
//        aniType += ([self.title isEqual:@"Topics"]) ? UIViewAnimationOptionTransitionFlipFromRight : UIViewAnimationOptionTransitionCurlDown;
        [self.btnBaby setImage:[UIImage imageNamed: @"baby-icon-purple"]];
        [UIView transitionFromView: self.theWebView2
                        toView: self.theWebView
                      duration:1.0 options: aniType  completion: nil ];    //^(BOOL finished) {}
    }
    else
    {
//        [self.view bringSubviewToFront:self.theWebView];
        aniType += UIViewAnimationOptionTransitionCurlUp;
//        aniType += ([self.title isEqual:@"Topics"]) ? UIViewAnimationOptionTransitionFlipFromLeft : UIViewAnimationOptionTransitionCurlUp;
        [self.btnBaby setImage:[UIImage imageNamed: @"pregnancy-icon-purple"]];
        [UIView transitionFromView: self.theWebView
                        toView: self.theWebView2
                          duration:1.0 options: aniType  completion: nil ];
    }
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"TopicsViewController -> shouldStartLoadWithRequest: %@", urlFileName);
    [Support LogURL:request];

    if ([urlFileName isEqualToString:@"baby-topics.html"] || [urlFileName isEqualToString:@"pregnancy-topics.html"]) return YES;
    
    BrowserSwipeViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                                  instantiateViewControllerWithIdentifier:@"SwipeBrowser"];
    viewController.hasAccordions = NO;
    viewController.hasWeekNav = NO;
    if (appdelegate.visibleProtocol==1) // On Pregnancy ?
    {
        viewController.contentList = self.swipeChildContentList;
        viewController.contentLocation = @"www/topics/pregnancy";
        [viewController setPageTo:[self LocatePage:urlFileName FromContent:self.swipeChildContentList]];
    }
    else
    {
        viewController.contentList = self.swipeChildContentList2;
        viewController.contentLocation = @"www/topics/baby";
        [viewController setPageTo: [self LocatePage:urlFileName FromContent:self.swipeChildContentList2]];
    }
    [self.navigationController pushViewController:viewController animated:YES];
    return NO;
}
- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    [(MainTabBarController*)(self.tabBarController) countWebCompletions]; // Used for initial UI preparation
}

-(int) LocatePage:(NSString*)page FromContent:(NSArray*)content
{
    int i;
    NSDictionary *numberItem;
    
    for (i=0; i <= content.count; i++)
    {
        if (i == content.count)
        {
            i=0; // If not found return first page
            break;
        }
        numberItem = [content objectAtIndex:i];
        if ([page isEqualToString:[numberItem valueForKey:@"Page"]]) break;
    }
    return i;
}

@end
