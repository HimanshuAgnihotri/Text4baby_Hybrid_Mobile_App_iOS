//
//  BrowserViewController.m
//  nT4B1
//
//  Created by Gustavo on 5/25/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "BrowserViewController.h"
#import "ExtBrowserViewController.h"

@interface BrowserViewController ()

@end

@implementation BrowserViewController

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

    self.theWebView.delegate = self;
    
    NSString *urlFileName = self.targetURL.lastPathComponent;
    if ([urlFileName isEqualToString:@"pregnancy-appointment.html"] || [urlFileName isEqualToString:@"baby-appointment.html"] )
        self.title = @"Appointment";
    if ([urlFileName isEqualToString:@"pregnancy-add-appointment.html"] || [urlFileName isEqualToString:@"baby-add-appointment.html"])
        self.title = @"Set Appointment";
    NSLog(@"BrowserViewController viewDidLoad: %@", urlFileName);
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:self.targetURL]];
    [self.navigationItem.backBarButtonItem setTitle: @""];
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented.
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog(@"Navigating to: %@", urlFileName);
    if ([urlFileName isEqualToString:self.targetURL.lastPathComponent]) return YES;

    if ([request.URL.scheme isEqualToString:@"http"] || [request.URL.scheme isEqualToString:@"https"])
    {
        ExtBrowserViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                                    instantiateViewControllerWithIdentifier:@"ExtBrowserViewController"];
        viewController.loadURLRequest = request;
        [self presentViewController:viewController animated:YES completion:NULL];
        return NO;
    }
    else
    {
        BrowserViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                                instantiateViewControllerWithIdentifier:@"BrowserVC"];
        viewController.targetURL = request.URL;
        [self.navigationController pushViewController:viewController animated:YES];
        return NO;
    }
    return YES;
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
