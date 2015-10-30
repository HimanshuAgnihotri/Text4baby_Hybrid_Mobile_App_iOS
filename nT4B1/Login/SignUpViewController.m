//
//  SignUpViewController.m
//  nT4B2b
//
//  Created by Gustavo on 10/4/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "SignUpViewController.h"
#import "MediaPlayer/MediaPlayer.h"
#import "AppDelegate.h"
#import "SignInViewController.h"
#import "MainTabBarController.h"
#import "BaseNavController.h"
#import "Support.h"

@interface SignUpViewController ()
{
    AppDelegate *appdelegate;
    MPMoviePlayerViewController *movieController; // TODO: Review if global is really required
    BOOL currentScreen;
    UIViewController *vcWait; // Keeps reference to wait screen to make sure only one is displayed and it can be located when hiding is required
}
@end

@implementation SignUpViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    // Setup current screen
    self.theWebView.delegate = self;

    vcWait = [Support getWaitViewControllerWithBackground:[UIColor clearColor]]; // Create "Please wait..." screen

    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    // Setup Notification to stop video playback and force back portrait mode
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(playbackFinished:)
                                                 name:MPMoviePlayerPlaybackDidFinishNotification
                                               object:nil];
    // Prepare "Back" button to be blank
    UIBarButtonItem *backButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
    [self.navigationItem setBackBarButtonItem:backButtonItem];
    self.navigationController.navigationBarHidden = NO;


    //Locate the initial page
    NSString *path;
    switch (self.screenFunction) {
        case SignUpFunctionSignUpTellUs:
            path = [[NSBundle mainBundle] pathForResource:@"signup-tell-us" ofType:@"html" inDirectory:@"www"];
            break;
        case SignUpFunctionSignUpFinish:
            path = [[NSBundle mainBundle] pathForResource:@"signup-finish" ofType:@"html" inDirectory:@"www"];
            break;
        case SignUpFunctionSignUpLink:
            path = [[NSBundle mainBundle] pathForResource:@"signup-link" ofType:@"html" inDirectory:@"www"];
            break;
        case SignUpFunctionSignUpCode:
            path = [[NSBundle mainBundle] pathForResource:@"signup-code" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case SignUpFunctionSignUpCarriers:
            path = [[NSBundle mainBundle] pathForResource:@"carrier-list" ofType:@"html" inDirectory:@"www"];
            break;
        case SignUpFunctionSignUpTerms:
//            path = [[NSBundle mainBundle] pathForResource:@"signup-terms-conditions" ofType:@"html" inDirectory:@"www"];
            path = [[NSBundle mainBundle] pathForResource:@"more-terms-conditions" ofType:@"html" inDirectory:@"www"];
            self.title = @"Terms and Conditions";
            break;
        case SignUpFunctionSignUpPolicy:
//            path = [[NSBundle mainBundle] pathForResource:@"signup-privacy-policy" ofType:@"html" inDirectory:@"www"];
            path = [[NSBundle mainBundle] pathForResource:@"more-privacy-policy" ofType:@"html" inDirectory:@"www"];
            self.title = @"Privacy Policy";
            break;
        default:
            self.screenFunction = SignUpFunctionSignUp;
            path = [[NSBundle mainBundle] pathForResource:@"sign-up" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
    }

    // Start SignUp page
    NSLog(@"SignUpViewController -> ViewDidLoad path %@", path);
    currentScreen = YES;
    [self.theWebView loadRequest: [NSURLRequest requestWithURL:[NSURL URLWithString:path]]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIWebView Delegate

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    if (currentScreen) // No navigation analysis required if just loading the initial screen
    {
        currentScreen = NO;
        return YES;
    }

    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
    NSString *urlFileName = request.URL.lastPathComponent;
    NSLog (@"SignUpViewController -> shouldStartLoadWithRequest: %@", urlFileName);
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
        [Support ProcessJSErrorsUsingURL:request andDelegate:nil];

    if ([urlFileName isEqualToString: (@"timeline.html")])
    {
        NSString *tempJSON = [request.URL.resourceSpecifier stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
//        tempJSON = [tempJSON substringFromIndex:15]; // Remove page name
        tempJSON = [tempJSON substringFromIndex:NSMaxRange([tempJSON rangeOfString:@"#"])]; // Remove page name
        MainTabBarController *controller = [Support getMainTabBarAndContentWithJSON: tempJSON];
        controller.userFirstName = [self.theWebView stringByEvaluatingJavaScriptFromString:@"window.localStorage.getItem(\"firstname\");"];
        self.view.window.rootViewController = controller;
    }
    if ([urlFileName isEqualToString: (@"contact-us.html")])
        [Support presentContactUsOver:self.navigationController];

    // Actions to be reviewed when on the SIGN-UP screen
    if ([urlFileName isEqualToString: (@"video")])
        [self playVideo];
    if (self.screenFunction==SignUpFunctionSignUp)
    {
        if ([urlFileName isEqualToString: (@"signup-tell-us.html")])
            [self presentSignUp: SignUpFunctionSignUpTellUs];
        if ([urlFileName isEqualToString: (@"signup-link.html")] )
            [self presentSignUp: SignUpFunctionSignUpLink];
        if ([urlFileName isEqualToString: (@"sign-in.html")] )
            [self presentSignIn:SignInFunctionSignIn];
    }
    if (self.screenFunction==SignUpFunctionSignUpLink)
    {
        if ([urlFileName isEqualToString: (@"signup-code.html")] )
            [self presentSignUp: SignUpFunctionSignUpCode];
    }
    if (self.screenFunction==SignUpFunctionSignUpTellUs)
    {
        if ([urlFileName isEqualToString: (@"signup-finish.html")] )
            [self presentSignUp: SignUpFunctionSignUpFinish];
    }
    if (self.screenFunction==SignUpFunctionSignUpFinish)
    {
        if ([urlFileName isEqualToString: (@"carrier-list.html")])
            [self presentSignUp: SignUpFunctionSignUpCarriers];
        if ([urlFileName isEqualToString: (@"signup-terms-conditions.html")])
            [self presentSignUp: SignUpFunctionSignUpTerms];
        if ([urlFileName isEqualToString: (@"signup-privacy-policy.html")] )
            [self presentSignUp: SignUpFunctionSignUpPolicy];
    }
    return NO;
}

#pragma mark - SignUp support methods

- (void)presentSignUp:(SignUpFunctions)nextScreen
{
    SignUpViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                                      bundle:nil] instantiateViewControllerWithIdentifier:@"sign-upVC"];
    vc.screenFunction = nextScreen;
    [self.navigationController pushViewController:vc animated:YES];
}
- (void)presentSignIn:(SignInFunctions)nextScreen
{
    SignInViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                instantiateViewControllerWithIdentifier:@"sign-inVC"];
    vc.screenFunction = nextScreen;
    [self.navigationController pushViewController:vc animated:YES];
}
- (void)playVideo
{
    // Localte the video in the local bundle
    NSURL *theurl=[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"welcomevideo" ofType:@"mp4"]];
    
    movieController = [[MPMoviePlayerViewController alloc] initWithContentURL:theurl];
    // Let the AppDeleagete and Navigation Controller know they should force Landscape
    appdelegate.isFullScreen = TRUE; // This is later reverted to false in a notification at the AppDelegate
    ((BaseNavController*)self.navigationController).allowedOrientations = UIInterfaceOrientationMaskLandscapeLeft + UIInterfaceOrientationMaskLandscapeRight;
    [self presentMoviePlayerViewControllerAnimated:movieController];
    [movieController.moviePlayer play];
}
- (void)playbackFinished:(NSNotification*)notification
{
    NSLog(@"SignUp -> playbackFinished");
    ((BaseNavController*)self.navigationController).allowedOrientations = UIInterfaceOrientationMaskPortrait;
}

@end
