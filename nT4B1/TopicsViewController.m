//
//  TimelineViewController.m
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "TopicsViewController.h"
#import "BrowserSwipeViewController.h"
#import "MainTabBarController.h"
#import "Support.h"


@interface TopicsViewController ()
{
    NSArray *swipeChildContentList;         // Topics Content List
    NSString *swipeChildContentLocation;    // Topics Content Location
}
@end

@implementation TopicsViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    // UI dynamically created to stop fighting AutoLayout
    CGRect windowFrame = [[UIScreen mainScreen] bounds];
    windowFrame.size.height -= 64; // TODO: Convert to TabBar value
    self.view.frame = windowFrame;
    [Support setBackgroundForView: self.view];

    self.theWebView = [[UIWebView alloc] initWithFrame:windowFrame]; // Create UIWebView
    [self.view addSubview:self.theWebView];
    if ([[[UIDevice currentDevice] systemVersion] intValue] >= 7) // Use inset to display UIWebView under translucent tabbar on iOS 7+
    {
        UIEdgeInsets insets = UIEdgeInsetsMake ( 0, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom, CGFloat right );
        [self.theWebView.scrollView setContentInset:insets];
        [self.theWebView.scrollView setScrollIndicatorInsets:insets];
    }
    CGRect frame = self.theWebView.frame;
    NSLog(@"theWebView Frame - X: %f, Y: %f, Width: %f, Height: %f", frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
    
    self.theWebView.delegate = self;
    self.theWebView.backgroundColor = [UIColor clearColor];

    NSString *path;
    if (self.screenFunction == TopicsFunctionsPreg)
    {
        NSLog(@"Preparing Topics Pregnancy");
        // Pregnancy Topics
        path = [[NSBundle mainBundle] pathForResource:@"pregnancy-topics" ofType:@"html" inDirectory:@"www/topics/pregnancy"];
        // Load Pregnancy Swipe Content
        swipeChildContentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsPreg" ofType:@"plist"]];
        swipeChildContentLocation = @"www/topics/pregnancy";
    }

    if (self.screenFunction == TopicsFunctionsBaby)
    {
        NSLog(@"Preparing Topics New Baby");
        // Baby Timeline
        path = [[NSBundle mainBundle] pathForResource:@"baby-topics" ofType:@"html" inDirectory:@"www/topics/baby"];
        // Load Pregnancy Swipe Content
        swipeChildContentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TopicsBaby" ofType:@"plist"]];
        swipeChildContentLocation = @"www/topics/baby";
    }
    
    NSLog(@"Pregnancy path: %@", path);
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    [Support disableWebLinkForWebView: self.theWebView]; // Disable visualizing links
    [self.theWebView becomeFirstResponder];
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"TopicsViewController -> shouldStartLoadWithRequest: %@", urlFileName);
    [Support LogURL:request];
    if (urlFileName == nil) return YES; // If the page name is nil, this most likely an email or phone number link and will be allowed

    // Don't analyze initial page, only subsequent navigations
    if ([urlFileName isEqualToString:@"baby-topics.html"] || [urlFileName isEqualToString:@"pregnancy-topics.html"]) return YES;
    
    BrowserSwipeViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                                  instantiateViewControllerWithIdentifier:@"SwipeBrowser"];
    viewController.hasAccordions = NO;
    viewController.hasWeekNav = NO;
    viewController.contentList = swipeChildContentList;
    viewController.contentLocation = swipeChildContentLocation;
    [viewController setPageTo:[self LocatePage:urlFileName FromContent:swipeChildContentList]];
    [viewController weekBarSetupAndWelcome]; // Prepare Week Navigation Bar. Show Welcome Back if necessary. Hide bar for Topics.

    [self.navigationController pushViewController:viewController animated:YES];
    return NO;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    [(MainTabBarController*)(self.tabBarController) countWebCompletions]; // Used for initial UI preparation
}


#pragma mark - SwapViewController Protocol
// Mandatory for all ViewControllers inlcuded in a SwapViewController.
- (void) viewRefresh
{
    // No need to implement if there is nothing to refresh
}
- (void) switchEvent: (T4bProtocols) newProtocol;
{
    // No need to implement if no action necessary when switching protocols
}


#pragma mark - Topics Support Functions

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
