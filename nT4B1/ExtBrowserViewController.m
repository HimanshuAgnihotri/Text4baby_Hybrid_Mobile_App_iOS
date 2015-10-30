//
//  ExtBrowserViewController.m
//  nC4L1
//
//  Created by Gustavo on 9/22/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "ExtBrowserViewController.h"
////#import "AppDelegate.h"
#import "Support.h"


@interface ExtBrowserViewController ()
{
////    AppDelegate *appdelegate;
    UIActivityIndicatorView *spinner;
}
@end

@implementation ExtBrowserViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // Do any additional setup after loading the view.
    self.btnDone.tintColor = [UIColor blueColor];
    self.toolBar.backgroundColor = [UIColor colorWithRed:237.0/255.0 green:15.0/255.0 blue:145.0/255.0 alpha:1];

    spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    spinner.center = CGPointMake(self.view.bounds.size.width/2, self.view.bounds.size.height/2);
    spinner.hidesWhenStopped = YES;
    
    self.theWebView.delegate = self;
    [self.theWebView loadRequest:self.loadURLRequest];
//    [Support updateAllowedOrientationsTo: UIInterfaceOrientationMaskAll];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)btnDone:(id)sender
{
//    [Support updateAllowedOrientationsTo: UIInterfaceOrientationMaskPortrait];
    [self dismissViewControllerAnimated:YES completion:nil];
}
- (IBAction)btnGoBack:(id)sender
{
    [self.theWebView goBack];
}
- (IBAction)btnGoForward:(id)sender
{
    [self.theWebView goForward];
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    spinner.center = CGPointMake(self.view.bounds.size.width/2, self.view.bounds.size.height/2);
    [self.view addSubview:spinner];
    [spinner startAnimating];
    
    return TRUE;
}
-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
    
    [spinner removeFromSuperview];
    NSLog(@"Error for WEBVIEW: %@", [error description]);
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    self.btnGoBack.enabled = self.theWebView.canGoBack;
    self.btnGoForward.enabled = self.theWebView.canGoForward;
    [spinner removeFromSuperview];

}
- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskAll;
}

- (BOOL)shouldAutorotate {
    return YES;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
{
    spinner.center = CGPointMake(self.view.bounds.size.width/2, self.view.bounds.size.height/2);
}
@end
