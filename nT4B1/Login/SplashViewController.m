//
//  SplashViewController.m
//  nT4B2b
//
//  Created by Gustavo on 10/1/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "SplashViewController.h"
#import "SignInViewController.h"

@interface SplashViewController ()

@end

@implementation SplashViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    self.theWebView.delegate = self;

    // Start Splash / Index page
    NSString *path = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www"];
//    self.theWebView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"iPadBackgroundTexture-grey.png"]];
    self.theWebView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"nT4B-bg-640x1136.png"]];

    NSLog(@"SplashViewController -> ViewDidLoad path %@", path);
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    NSLog (@"shouldStartLoadWithRequest URL.absoluteString: %@",request.URL.absoluteString);
    NSLog (@"URL.lastPathComponent: %@",request.URL.lastPathComponent);
    NSLog (@"URL.scheme: %@",request.URL.scheme);
    NSLog (@"URL.parameterString: %@",request.URL.parameterString);
    NSLog (@"URL.query: %@",request.URL.query);
    NSLog (@"URL.query: %@", request.URL.query);

    NSString *urlFileName = request.URL.lastPathComponent;
    if ([urlFileName isEqualToString: (@"sign-up.html")])
    {
        [self performSegueWithIdentifier: @"sign-up" sender: self];
        self.theWebView = nil;
        return NO;
    }
    if ([urlFileName isEqualToString: (@"sign-in.html")])
    {
        [self performSegueWithIdentifier: @"sign-in" sender: self];
        self.theWebView = nil;
        return NO;
    }
    // Automatic login
    if ([urlFileName isEqualToString: (@"timeline.html")])
    {
        SignInViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                                instantiateViewControllerWithIdentifier:@"sign-inVC"];
        viewController.screenFunction = SignInFunctionForgotPassword;
        
        [self.navigationController pushViewController:viewController animated:YES];

        NSString *temp = [request.URL.query stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        NSData* data = [temp dataUsingEncoding:NSUTF8StringEncoding];
        if (data != nil)
        {
            NSDictionary *jsonDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
            NSInteger iWeek = [[jsonDictionary objectForKey:@"week"] intValue];
            NSInteger iMode = [[jsonDictionary objectForKey:@"mode"] intValue];
            NSLog(@"Protocol %i, Week: %i", iMode, iWeek);
        }
        [self performSegueWithIdentifier: @"TimelineNav" sender: self];
        [self performSegueWithIdentifier: @"sign-in-auto" sender: self];
        self.theWebView = nil;
        return NO;
    }
    return YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


#pragma mark - Navigation

//In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    UINavigationController *nc = [segue destinationViewController];
    nc.title =@"Auto";
    SignInViewController *dvc = [nc.viewControllers objectAtIndex:0];

    if ([[segue identifier] isEqualToString:@"sign-in"])
    {
//        dvc.AutoLogin = false;
    }
    if ([[segue identifier] isEqualToString:@"sign-in-auto"])
    {
//        dvc.AutoLogin = true;
    }
}


@end
