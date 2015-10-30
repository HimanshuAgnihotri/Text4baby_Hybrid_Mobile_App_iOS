//
//  ContactUsViewController.m
//  nT4B2b
//
//  Created by Gustavo on 10/3/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "ContactUsViewController.h"
#import "Support.h"

@interface ContactUsViewController ()
{
    UIViewController *vcWait;
}
@end

@implementation ContactUsViewController

// load the view nib and initialize the pageNumber ivar
- (id)init
{
    if (self = [super initWithNibName:@"WebViewController" bundle:nil]) // Uses the same xib as WebViewController
    {
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.

    self.theWebView.delegate = self;
    self.theWebView.backgroundColor = [UIColor whiteColor];
    self.title = @"Contact Us";

    vcWait = [Support getWaitViewControllerWithBackground:[UIColor clearColor]]; // Create "Please wait..." screen
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"contact-us" ofType:@"html" inDirectory:@"www"];
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:path]]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{

    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"ContactUsViewController -> shouldStartLoadWithRequest: %@", urlFileName);
    [Support LogURL:request];

    if ([urlFileName isEqual:@"contact-us.html"]) return YES;
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
    {
        [Support ProcessJSErrorsUsingURL:request andDelegate:self];
//        NSString *error = [self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"error\");"];
    }
    return NO;
}

#pragma mark - UIAlertView Delegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    [self.navigationController popViewControllerAnimated:YES];
}

@end
