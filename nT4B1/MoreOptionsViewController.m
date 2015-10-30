//
//  MoreOptionsViewController.m
//  nT4B2b
//
//  Created by Gustavo on 10/24/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "MoreOptionsViewController.h"
#import "MoreViewController.h"
#import "MainTabBarController.h"
#import "Support.h"

@interface MoreOptionsViewController ()
{
    BOOL currentScreen;
    UIViewController *vcWait;
    errorAlertType alertType;
    UINavigationController *nc;
    MainTabBarController *tb;

}

@end

@implementation MoreOptionsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    // Keep references that sometimes return as nil from uiwebview
    nc = self.navigationController;
    tb = (MainTabBarController *) nc.tabBarController;
    
    self.theWebView.delegate = self;
    UIBarButtonItem *backButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
    [self.navigationItem setBackBarButtonItem:backButtonItem];
    
    vcWait = [Support getWaitViewControllerWithBackground:[UIColor clearColor]]; // Create "Please wait..." screen
    
    NSString *path;
    //Locate the HTML page for the current screen function
    switch (self.screenFunction) {
        case MoreFunctionAccountSettings:
            path = [[NSBundle mainBundle] pathForResource:@"more.accountsettings" ofType:@"htm" inDirectory:@"www"];
            self.title = @"Account Settings";
            self.theWebView.scrollView.bounces = NO;
            break;
        case MoreFunctionMessageSettings:
            path = [[NSBundle mainBundle] pathForResource:@"more.messagesettings" ofType:@"htm" inDirectory:@"www"];
            self.title = @"Message Settings";
            self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case MoreFunctionBadges:
            path = [[NSBundle mainBundle] pathForResource:@"more.badges" ofType:@"htm" inDirectory:@"www"];
            self.title = @"Badges";
            break;
        case MoreFunctionAbout:
            path = [[NSBundle mainBundle] pathForResource:@"more.about" ofType:@"htm" inDirectory:@"www"];
            self.title = @"About Text4baby";
            break;
        case MoreFunctionTerms:
            path = [[NSBundle mainBundle] pathForResource:@"more-terms-conditions" ofType:@"html" inDirectory:@"www"];
            self.title = @"Terms and Conditions";
            break;
        case MoreFunctionPrivacy:
            path = [[NSBundle mainBundle] pathForResource:@"more-privacy-policy" ofType:@"html" inDirectory:@"www"];
            self.title = @"Privacy Policy";
            break;
        case MoreFunctionClearData:
            path = [[NSBundle mainBundle] pathForResource:@"more.cleardata" ofType:@"htm" inDirectory:@"www"];
            self.title = @"Clear Data";
            self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case MoreFunctionCarrierList:
            path = [[NSBundle mainBundle] pathForResource:@"more-carrier-list" ofType:@"html" inDirectory:@"www"];
            self.title = @"List of Carriers";
            break;
    }
    
    // Start login page
    NSLog(@"MoreOptionsViewController -> ViewDidLoad path %@", path);
    currentScreen = YES;
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    [self.navigationItem.backBarButtonItem setTitle: @""];
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    if (currentScreen) { // No navigation analysis required if just loading the initial screen
        currentScreen = NO;
        return YES;
    }
    
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"MoreOptionsViewController -> shouldStartLoadWithRequest: %@", urlFileName);
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
    
    // Look for error alerts triggered from JS
    if ([request.URL.path rangeOfString:@"error"].location != NSNotFound)
        alertType = [Support ProcessJSErrorsUsingURL:request andDelegate:self];

    // Actions to be reviewed for specific screens
    switch (self.screenFunction)
    {
        case MoreFunctionAccountSettings:
            if ([urlFileName isEqual:@"more.html"])
            {
                NSInteger tempProtocol = [[self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"currenttext4babyprotocol\");"] integerValue];
                NSInteger tempWeek;
                if (tempProtocol == 1)
                    tempWeek = [[self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"week\");"] integerValue];
                else
                    tempWeek = [[self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"weeknb\");"] integerValue];
                
                tb.visibleProtocol = tb.userT4bProtocol = tempProtocol;
                tb.userWeek = tempWeek;
                [tb reset]; // Reset tabbar and from there, any necessary viewcontrollers

                [self.navigationController popViewControllerAnimated:YES];
                break;
            }
            if ([urlFileName isEqual:@"more.accountsettings.htm"])
            {
                if (vcWait.view.superview == nil) [self.view addSubview: vcWait.view]; // Show wait screen if not already done
/*
                NSInteger tempProtocol = [[self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"currenttext4babyprotocol\");"] integerValue];
                NSInteger tempWeek;
                if (tempProtocol == 1)
                    tempWeek = [[self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"week\");"] integerValue];
                else
                    tempWeek = [[self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"weeknb\");"] integerValue];
                
                tb.visibleProtocol = tb.userT4bProtocol = tempProtocol;
                tb.userWeek = tempWeek;
                [tb reset]; // Reset tabbar and from there, any necessary viewcontrollers
*/
/*
                NSString *tempJSON = [NSString stringWithFormat: @"{\"week\":%li,\"mode\":%li, \"firstname\":\"\"}", (long)tempWeek, (long)tempProtocol];
 
                MainTabBarController *controller = [Support getMainTabBarAndContentWithJSON: tempJSON];
                controller.userFirstName = [self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"firstname\");"];
                self.view.window.rootViewController = controller;
*/
            }
        case MoreFunctionMessageSettings:
            if ([urlFileName isEqual:@"more-carrier-list.html"])
            {
                MoreOptionsViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil] instantiateViewControllerWithIdentifier:@"MoreOptions"];
                vc.screenFunction = MoreFunctionCarrierList;
                [self.navigationController pushViewController:vc animated:YES];
                break;
            }
    }
    return NO;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIAlertView Delegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    // if first button (Yes), dismiss TabBarController to go back to Login screen
    //    if (buttonIndex == 0) [self.tabBarController dismissViewControllerAnimated:true completion:nil];

    NSLog(@"$(\"#flip-select-text-message\").val(): %@", [self.theWebView stringByEvaluatingJavaScriptFromString: @"$(\"#flip-select-text-message\").val();"]);
    if (alertType==errorAlertMoreClearData)
    {
        if (buttonIndex == 0)
        {
            [self.theWebView stringByEvaluatingJavaScriptFromString:@"ClearData();"];
            // Replace root view with sign-in view controller
            self.view.window.rootViewController = [Support getRootLogin];
        }
    }
    if (alertType==errorAlertMoreMessageSetting_OffToOn)
    {
        [self.theWebView stringByEvaluatingJavaScriptFromString: @"messagsettingnochange();"];
    }
    if (alertType==errorAlertMoreMessageSetting)
    {
        if (buttonIndex == 0) // YES
        {
            [self.theWebView stringByEvaluatingJavaScriptFromString: @"messagsettingchange();"];
        }
        if (buttonIndex == 1) // NO
        {
            // TODO: Fix buttons for Message Settings
            [self.theWebView stringByEvaluatingJavaScriptFromString: @"nochange();"];
        }
    }
    
    alertType = 0;
}

@end
