//
//  MoreViewController.m
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "MoreViewController.h"
#import "Support.h"

//#import "WeekTableViewController.h"

@interface MoreViewController ()

@end

@implementation MoreViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.theWebView.delegate = self;
    [Support setBackgroundForView: self.theWebView];
////    self.theWebView.backgroundColor = [UIColor clearColor];

    NSString *path = [[NSBundle mainBundle] pathForResource:@"more" ofType:@"html" inDirectory:@"www"]; // Works with reference to www
    NSLog(@"path %@", path);
    // Start login page
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    [self.navigationItem.backBarButtonItem setTitle: @""];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"MoreViewController -> shouldStartLoadWithRequest: %@", urlFileName);
    [Support LogURL:request];

    if ([urlFileName isEqual:@"more.html"]) return YES;
    
    else if ([urlFileName isEqual:@"more.accountsettings.htm"])
        [self gotoMoreOptions: MoreFunctionAccountSettings];
    else if ([urlFileName isEqualToString: (@"more.messagesettings.htm")])
        [self gotoMoreOptions: MoreFunctionMessageSettings];
    else if ([urlFileName isEqualToString: (@"more.badges.htm")])
        [self gotoMoreOptions: MoreFunctionBadges];
    else if ([urlFileName isEqualToString: (@"contact-us.html")])
        [Support presentContactUsOver:self.navigationController];
    else if ([urlFileName isEqual:@"more.about.htm"])
        [self gotoMoreOptions: MoreFunctionAbout];
    else if ([urlFileName isEqual:@"more-terms-conditions.html"])
        [self gotoMoreOptions: MoreFunctionTerms];
    else if ([urlFileName isEqual:@"more-privacy-policy.html"])
        [self gotoMoreOptions: MoreFunctionPrivacy];
    else if ([urlFileName isEqual:@"more.cleardata.htm"])
        [self gotoMoreOptions: MoreFunctionClearData];
    else if ([urlFileName isEqual:@"more.logout.htm"])
        [self presentLogoutAlert];
    return NO; // All possible cases are controlled now so DENY regular navigation by default.
}

#pragma mark - More Options Support Functions

- (void)gotoMoreOptions:(MoreFunctions)nextScreen
{
    MoreOptionsViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil] instantiateViewControllerWithIdentifier:@"MoreOptions"];
    vc.screenFunction = nextScreen;
    [self.navigationController pushViewController:vc animated:YES];
}

- (void)presentLogoutAlert
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Text4baby" message: @"Are you sure you want to log out?" delegate: self cancelButtonTitle:nil otherButtonTitles:@"Yes", @"No", nil];
    alert.cancelButtonIndex = 1; // Second button to cancel
    [alert show];
}

- (void)execLogout
{
    NSLog(@"*** LOGOUT ***");
    // Clear necessary local storage variables
//        [self.theWebView stringByEvaluatingJavaScriptFromString:@"logout();"]; // Not using logout() because the navigation event is not necessary
    // TODO: Remove these 3 JS calls when there is a function to clear variables (common with Android version)
    [self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.setItem(\"session\", \"false\");"];
    [self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.setItem(\"rememberpassword\", \"false\");"];
    [self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.setItem(\"password\", \"\");"];
    
    // Replace root view with sign-in view controller
    self.view.window.rootViewController = [Support getRootLogin];
}

#pragma mark - UIAlertView Delegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    NSLog(@"Logout Alert: %li", (long)buttonIndex);
    if (buttonIndex == 0) [self execLogout]; // if first button (Yes), replace window root view controller
}

@end
