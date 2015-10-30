//
//  CalendarViewController.m
//  nT4B2b
//
//  Created by Gustavo on 11/6/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "CalendarViewController.h"
#import "SwapViewController.h"
#import "MainTabBarController.h"
#import "Support.h"

@interface CalendarViewController ()
{
    BOOL currentScreen;
    UIViewController *vcWait;
    errorAlertType alertType;

    NSInteger expandedSection;
    NSString *t4bBlockPrefix;
    NSInteger browserTopScroll;
    BOOL applyKnownState;
}
@end

@implementation CalendarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    NSLog(@"CalendarViewController Title: %@", self.parentViewController.navigationItem.title);

    CGRect windowFrame = [[UIScreen mainScreen] bounds];
    windowFrame.size.height -= 64; // TODO: Convert to TabBar value
    self.view.frame = windowFrame;
    [Support setBackgroundForView: self.view];

    self.theWebView = [[UIWebView alloc] initWithFrame:windowFrame]; // Create UIWebView
    [self.view addSubview:self.theWebView];
    if ([[[UIDevice currentDevice] systemVersion] intValue] >= 7) // Use inset to display UIWebView under translucent tabbar on iOS 7+
    {
        self.automaticallyAdjustsScrollViewInsets = NO; // Necessary due to different behavior between iOS 7 and 8. If removed, it affects second/third level calendar view controllers under iOS 8.
        UIEdgeInsets insets = UIEdgeInsetsMake ( 0, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom, CGFloat right );
        [self.theWebView.scrollView setContentInset:insets];
        [self.theWebView.scrollView setScrollIndicatorInsets:insets];
    }
    CGRect frame = self.theWebView.frame;
    NSLog(@"theWebView Frame - X: %f, Y: %f, Width: %f, Height: %f", frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
    
    self.theWebView.delegate = self;
    self.theWebView.backgroundColor = [UIColor clearColor];

    // Manually configure the views and webviews. Adjust insets automatically disabled because of differences between iOS 7 and 8
//    UIEdgeInsets current = self.theWebView.scrollView.contentInset;

    //    NSLog(@"* ContentInset: %f", current.bottom);
/*
    CGRect frame = self.view.frame;
    frame.size.height = 504;
    self.theWebView.frame = frame;
    self.view.frame = frame;
*/
/*
    if ([[[UIDevice currentDevice] systemVersion] intValue] >= 7) // Use inset to display UIWebView under translucent tabbar on iOS 7+
    {
        UIEdgeInsets insets = UIEdgeInsetsMake ( 0, 0, 48, 0); // UIEdgeInsetsMake ( CGFloat top, CGFloat left, CGFloat bottom, CGFloat right );
        [self.theWebView.scrollView setContentInset:insets];
        [self.theWebView.scrollView setScrollIndicatorInsets:insets];
    }
    current = self.theWebView.scrollView.contentInset;
    NSLog(@"* ContentInset: %f", current.bottom);
*/
    // Background visible when attempting scroll beyond page limits. Image scaled to view's size
    [Support setBackgroundForView: self.view];
////    UIGraphicsBeginImageContext(self.view.frame.size);
////    [[UIImage imageNamed:@"t4b-background-01.png"] drawInRect:self.view.bounds];
////    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
////    UIGraphicsEndImageContext();
////    self.view.backgroundColor = [UIColor colorWithPatternImage: image];//[UIImage imageNamed:@"t4b-background-01.png"]];

//    self.theWebView.backgroundColor = [UIColor clearColor];
//    self.theWebView.backgroundColor = [UIColor blueColor];

    vcWait = [Support getWaitViewControllerWithBackground:[UIColor clearColor]]; // Create "Please wait..." screen
    
    NSString *path;
    //Locate the HTML page for the current screen function
    switch (self.screenFunction) {
        case CalendarFunctionsPreg:
            path = [[NSBundle mainBundle] pathForResource:@"pregnancy-calendar" ofType:@"html" inDirectory:@"www"];
            t4bBlockPrefix = @"preg";
            break;
        case CalendarFunctionsBaby:
            path = [[NSBundle mainBundle] pathForResource:@"baby-calendar" ofType:@"html" inDirectory:@"www"];
            t4bBlockPrefix = @"baby";
            break;
        case CalendarFunctionsAppointmentPreg:
            path = [[NSBundle mainBundle] pathForResource:@"pregnancy-appointment" ofType:@"html" inDirectory:@"www"];
            break;
        case CalendarFunctionsAppointmentBaby:
            path = [[NSBundle mainBundle] pathForResource:@"baby-appointment" ofType:@"html" inDirectory:@"www"];
            break;
        case CalendarFunctionsSetAppointmentPreg:
            path = [[NSBundle mainBundle] pathForResource:@"pregnancy-add-appointment" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case CalendarFunctionsSetAppointmentBaby:
            path = [[NSBundle mainBundle] pathForResource:@"baby-add-appointment" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case CalendarFunctionsChecklistPreg:
            path = [[NSBundle mainBundle] pathForResource:@"pregnancy-add-checklist" ofType:@"html" inDirectory:@"www"];
            break;
        case CalendarFunctionsChecklistBaby:
            path = [[NSBundle mainBundle] pathForResource:@"baby-add-checklist" ofType:@"html" inDirectory:@"www"];
            break;
        case CalendarFunctionsChecklistAddItemPreg:
            path = [[NSBundle mainBundle] pathForResource:@"pregnancy-checklist-item" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case CalendarFunctionsChecklistAddItemBaby:
            path = [[NSBundle mainBundle] pathForResource:@"baby-checklist-item" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
            break;
    }
    // Load Page
    applyKnownState = NO; // No need to apply last known state (scroll and expanded sections) if it is a new page load
    if (self.queryParameters.length>0) path = [NSString stringWithFormat:@"%@?%@", path, self.queryParameters];
    currentScreen = YES;
    [self.theWebView loadRequest: [NSURLRequest requestWithURL:[NSURL URLWithString:path]]];

    UIBarButtonItem *backButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
    [self.navigationItem setBackBarButtonItem:backButtonItem]; // Initial blank back button is in SwapViewController. Required for all other next pages
}
- (void)viewWillAppear:(BOOL)animated
{
    NSLog(@"** View HEIGHT: %f", self.view.frame.size.height);
    NSLog(@"** UIWebView HEIGHT: %f", self.theWebView.frame.size.height);
//    self.theWebView.frame = self.view.bounds;
//    [self.view bringSubviewToFront:self.theWebView];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    if (currentScreen) { // No navigation analysis required if just loading the initial screen
        currentScreen = NO;
        return YES;
    }
    
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"CalendarViewController -> shouldStartLoadWithRequest: %@", urlFileName);
    [Support LogURL:request];
    if (urlFileName == nil) return YES; // If the page name is nil, this most likely an email or phone number link and will be allowed
    
    // Process notification of an API invocation
    if ([urlFileName isEqualToString: (@"DO.TX")])
    {
        [Support ProcessAPIwithJSON:[request.URL.resourceSpecifier stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding]
                          onWebView:self.theWebView
                            showing:vcWait
                 overViewController:self.navigationController];
        return NO; // Do not continue because wait screen will be removed
    }
    
    // If not doing any new transaction, remove wait screen (if visible) before evaluating any next actions
    if (vcWait.view.superview != nil) [vcWait.view removeFromSuperview];
    
    // Evaluate and Present any Errors
    if ([request.URL.path rangeOfString:@"error"].location != NSNotFound)
        alertType = [Support ProcessJSErrorsUsingURL:request andDelegate:self];
    
    switch (self.screenFunction)
    {
        // Pregnancy Calendar
        case CalendarFunctionsPreg:
            if ([urlFileName isEqualToString: (@"pregnancy-appointment.html")])
                [self gotoCalendar:CalendarFunctionsAppointmentPreg withTitle:@"Appointment" andParameters:request.URL.query];
            break;
        case CalendarFunctionsAppointmentPreg:
            if ([urlFileName isEqualToString: (@"pregnancy-add-appointment.html")])
                [self gotoCalendar:CalendarFunctionsSetAppointmentPreg withTitle:@"Set Appointment" andParameters:request.URL.query];

            if ([urlFileName isEqualToString: (@"pregnancy-add-checklist.html")])
                [self gotoCalendar:CalendarFunctionsChecklistPreg withTitle:@"Add a Checklist" andParameters:request.URL.query];//Checklist
            break;
        case CalendarFunctionsChecklistPreg:
            if ([urlFileName isEqualToString: (@"pregnancy-checklist-item.html")])
                [self gotoCalendar:CalendarFunctionsChecklistAddItemPreg withTitle:@"Add a Checklist Item" andParameters:request.URL.query];
            break;

        // Pregnancy completion verifications (i.e. completed new appointment date or new checklist items
        case CalendarFunctionsSetAppointmentPreg:
            if ([urlFileName isEqualToString: (@"pregnancy-appointment.html")]) // Intercept navigation back to previous page. Do refresh and remove current
            {
                // Refresh the first calendar page to display updated dates
                SwapViewController *swap = (SwapViewController *)[self.navigationController.viewControllers objectAtIndex:0];
                [swap refreshCurrentView]; // Reload using protocol
                // Refresh previous screen. No data on this screen, however link to date setting screen must be refreshed
                NSString *path = [[NSBundle mainBundle] pathForResource:@"pregnancy-appointment" ofType:@"html" inDirectory:@"www"];
                path = [NSString stringWithFormat:@"%@?%@", path, request.URL.query];
                [((CalendarViewController *)[self.navigationController.viewControllers objectAtIndex:self.navigationController.viewControllers.count-2]) navigateTo:path];
                [self.navigationController popViewControllerAnimated:YES];
            }
            break;
        case CalendarFunctionsChecklistAddItemPreg:
            // Once a new checklist item is saved, remove screen
            if ([urlFileName isEqualToString: (@"pregnancy-add-checklist.html")])
            {
                [((CalendarViewController *)[self.navigationController.viewControllers objectAtIndex:self.navigationController.viewControllers.count-2]) viewRefresh]; // Reload the previous page
                [self.navigationController popViewControllerAnimated:YES];
            }
            break;
            
        // Baby Functions
        case CalendarFunctionsBaby:
            if ([urlFileName isEqualToString: (@"baby-appointment.html")])
                [self gotoCalendar:CalendarFunctionsAppointmentBaby withTitle:@"Appointment" andParameters:request.URL.query];
            break;
        case CalendarFunctionsAppointmentBaby:
            if ([urlFileName isEqualToString: (@"baby-add-appointment.html")])
                [self gotoCalendar:CalendarFunctionsSetAppointmentBaby withTitle:@"Set Appointment" andParameters:request.URL.query];

            if ([urlFileName isEqualToString: (@"baby-add-checklist.html")])
                [self gotoCalendar:CalendarFunctionsChecklistBaby withTitle:@"Add a Checklist" andParameters:request.URL.query];//Checklist
            break;
        case CalendarFunctionsChecklistBaby:
            if ([urlFileName isEqualToString: (@"baby-checklist-item.html")])
                [self gotoCalendar:CalendarFunctionsChecklistAddItemBaby withTitle:@"Add a Checklist Item" andParameters:request.URL.query];
            break;

        // Baby completion verifications (i.e. completed new appointment date or new checklist items
        case CalendarFunctionsSetAppointmentBaby:
            if ([urlFileName isEqualToString: (@"baby-appointment.html")]) // Intercept navigation back to previous page. Do refresh and remove current
            {
                // Refresh the first calendar page to display updated dates
                SwapViewController *swap = (SwapViewController *)[self.navigationController.viewControllers objectAtIndex:0];
                [swap refreshCurrentView]; // Reload using protocol
                // Refresh previous screen. No data on this screen, however link to date setting screen must be refreshed
                NSString *path = [[NSBundle mainBundle] pathForResource:@"baby-appointment" ofType:@"html" inDirectory:@"www"];
                path = [NSString stringWithFormat:@"%@?%@", path, request.URL.query];
                [((CalendarViewController *)[self.navigationController.viewControllers objectAtIndex:self.navigationController.viewControllers.count-2]) navigateTo:path];
                [self.navigationController popViewControllerAnimated:YES];
            }
            break;
        case CalendarFunctionsChecklistAddItemBaby:
            // Once a new checklist item is saved, remove screen
            if ([urlFileName isEqualToString: (@"baby-add-checklist.html")])
            {
                [((CalendarViewController *)[self.navigationController.viewControllers objectAtIndex:self.navigationController.viewControllers.count-2]) viewRefresh]; // Reload the previous page
                [self.navigationController popViewControllerAnimated:YES];
            }
            break;
    }
    return NO;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    if (applyKnownState)
    {
        [self applyLastKnownState];
    }
    [(MainTabBarController*)(self.tabBarController) countWebCompletions]; // Used for initial UI preparation
}

#pragma mark - SwapViewController Protocol
// Mandatory for all ViewControllers inlcuded in a SwapViewController.
- (void) viewRefresh
{
    [self updateLastKnownState]; // Update current state before refresh
    currentScreen = YES; // Let the browser navigate
    [self.theWebView reload];
    applyKnownState = YES; // If asked to refresh, remember state and apply it after loading web page
}
- (void) switchEvent: (T4bProtocols) newProtocol;
{
    // No need to implement if no action necessary when switching protocols
}


#pragma mark - Calendar Support Functions

- (void)gotoCalendar:(CalendarFunctions)nextScreen withTitle:(NSString *)title andParameters:(NSString *)param
{
    CalendarViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                                        bundle:nil] instantiateViewControllerWithIdentifier:@"CalendarVC"];
    viewController.screenFunction = nextScreen;
    viewController.title = title;
    viewController.queryParameters = param;
    UIBarButtonItem *backButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
    [self.navigationItem setBackBarButtonItem:backButtonItem];
    [self.navigationController pushViewController:viewController animated:YES];
    [viewController.navigationItem.backBarButtonItem setTitle: @""];
}


- (void) navigateTo: (NSString *)path
{
    currentScreen = YES;
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:path]]];
}

- (void)updateLastKnownState
{
    NSString *js, *result;
    expandedSection = 0;
    for (NSInteger i=1; i<=3; i++)
    {
        // Prepare and execute JS
        js = [NSString stringWithFormat:@"$('#%@%lia').hasClass('ui-collapsible-heading-collapsed')", t4bBlockPrefix, (long)i];
        result = [self.theWebView stringByEvaluatingJavaScriptFromString:js];
        // If an accordion doesn't have the collapsed class, keep it as the last known accordion state
        if ([result isEqualToString:@"false"]) expandedSection = i;
    }
    NSLog(@"Calendar Expand state: %li", (long)expandedSection);
    // Now get the vertical scroll position for current web browser
    NSString *x = [self.theWebView stringByEvaluatingJavaScriptFromString:@"document.body.scrollTop;"];
    browserTopScroll = [x intValue];
    NSLog(@"Calendar document.body.scrollTop: %@", x);
}
- (void)applyLastKnownState
{
    NSString *js, *result;
    // If there are accordions, try to expand accordion for next page
    js = [NSString stringWithFormat:@"$('#%@%li').trigger('expand'); FetchCalendarDataFromDB('%li');", t4bBlockPrefix, (long)expandedSection, (long)expandedSection];
    result = [self.theWebView stringByEvaluatingJavaScriptFromString:js];
    // Align next web browser vertical scroll position
    js = [NSString stringWithFormat:@"setTimeout(window.scrollTo(0,%li),100);", (long)browserTopScroll];
    NSLog(@"Vertical Align JS-> %@", js);
    result = [self.theWebView stringByEvaluatingJavaScriptFromString:js];
}

#pragma mark - UIAlertView Delegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (alertType==errorAlertCalendarMessageSettings && buttonIndex == 0)
    {
        MainTabBarController *tb = (MainTabBarController *) self.tabBarController;
        [tb gotoMessageSettings];
    }
}

@end
