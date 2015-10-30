//
//  SignInViewController.m
//  nT4B2b
//
//  Created by Gustavo on 10/3/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

//#import "AppDelegate.h"
#import "SignInViewController.h"
#import "SignUpViewController.h"
#import "WaitViewController.h"
#import "Support.h"

@interface SignInViewController ()
{
    BOOL currentScreen;
    UIViewController *vcWait;
    errorAlertType lastErrorAlert;
}
@end

@implementation SignInViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.theWebView.delegate = self;
    // Prepare "Back" button to be blank
    UIBarButtonItem *backButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
    [self.navigationItem setBackBarButtonItem:backButtonItem];
    self.navigationController.navigationBarHidden = NO;

    vcWait = [Support getWaitViewControllerWithBackground:[UIColor clearColor]]; // Create "Please wait..." screen
    
    NSString *path;
    //Locate the HTML page for the current screen function
    switch (self.screenFunction) {
        case SignInFunctionForgotPassword:
            path = [[NSBundle mainBundle] pathForResource:@"signin-forgotpw" ofType:@"html" inDirectory:@"www"];
            self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case SignInFunctionSignIn:
            path = [[NSBundle mainBundle] pathForResource:@"sign-in" ofType:@"html" inDirectory:@"www"];
            if (self.view.bounds.size.height > 504) self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case SignInFunctionResetPassword:
            path = [[NSBundle mainBundle] pathForResource:@"signin-reset" ofType:@"html" inDirectory:@"www"];
            self.theWebView.scrollView.scrollEnabled = NO;
            break;
        case SignInFunctionChangePassword:
            path = [[NSBundle mainBundle] pathForResource:@"signin-changepw" ofType:@"html" inDirectory:@"www"];
            self.theWebView.scrollView.scrollEnabled = NO;
            break;
        default:
            self.screenFunction = SignInFunctionSplash;
            self.navigationController.navigationBarHidden = TRUE;
            self.theWebView.scrollView.scrollEnabled = NO;
            self.theWebView.backgroundColor = [UIColor clearColor];
            path = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www"];
            break;
    }

    // Start login page
    NSLog(@"SignInViewController -> ViewDidLoad path %@", path);
    currentScreen = YES;
   
   /* NSURL *localHTMLURL = [NSURL fileURLWithPath:path];
    NSURLRequest *request = [NSURLRequest requestWithURL:localHTMLURL
                                             cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                         timeoutInterval:60];
   
    //[localWebView loadRequest:request];
    [self.theWebView stopLoading];*/
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];//
   
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
    NSLog (@"SignInViewController -> shouldStartLoadWithRequest: %@", urlFileName);
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

    // Actions to be reviewed on any screen
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

    // Actions to be reviewed for specific screens
    if (self.screenFunction==SignInFunctionSplash)
    {
        if ([urlFileName isEqualToString: (@"sign-up.html")])
            [self presentSignUp:SignUpFunctionSignUp asRoot:YES];
        if ([urlFileName isEqualToString: (@"signup-link.html")])
        {
            self.navigationController.navigationBarHidden = false;
            [self presentSignIn: SignUpFunctionSignUpLink asRoot:YES];
        }
        if ([urlFileName isEqualToString: (@"sign-in.html")])
        {
            self.navigationController.navigationBarHidden = false;
            [self presentSignIn: SignInFunctionSignIn asRoot:YES];
        }
        if ([urlFileName isEqualToString: (@"signup-tell-us.html")])
            [self presentSignIn: SignUpFunctionSignUpTellUs asRoot:YES];
    }
    if (self.screenFunction==SignInFunctionSignIn)
    {
        if ([urlFileName isEqualToString: (@"signin-forgotpw.html")])
            [self presentSignIn: SignInFunctionForgotPassword asRoot:NO];
        if ([urlFileName isEqualToString: (@"signin-changepw.html")])
            [self presentSignIn: SignInFunctionChangePassword asRoot:NO];
    }
    if (self.screenFunction==SignInFunctionForgotPassword)
    {
        if ([urlFileName isEqualToString: (@"signin-reset.html")])
            [self presentSignIn: SignInFunctionResetPassword asRoot:NO];
    }
    if (self.screenFunction==SignInFunctionResetPassword)
    {
        if ([urlFileName isEqualToString: (@"sign-in.html")])
        {
             // Drop back to root view controller which already has the login screen
            [self.navigationController popToRootViewControllerAnimated:YES];
            self.screenFunction = SignInFunctionSignIn;
          
        }
    }
    return NO;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    [Support disableWebLinkForWebView: self.theWebView];
}

#pragma mark - SignIn support methods

- (void)presentSignUp:(SignUpFunctions)nextScreen asRoot: (BOOL) pAsRoot
{
    SignUpViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                          bundle:nil] instantiateViewControllerWithIdentifier:@"sign-upVC"];
    vc.screenFunction = nextScreen;
    if (pAsRoot)
        [self.navigationController setViewControllers:[NSArray arrayWithObjects:vc, nil] animated:NO];
    else
        [self.navigationController pushViewController:vc animated:YES];
}
- (void)presentSignIn:(SignInFunctions)nextScreen asRoot: (BOOL) pAsRoot
{
    SignInViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                instantiateViewControllerWithIdentifier:@"sign-inVC"];
    vc.screenFunction = nextScreen;
    if (pAsRoot)
        [self.navigationController setViewControllers:[NSArray arrayWithObjects:vc, nil] animated:NO];
    else
        [self.navigationController pushViewController:vc animated:YES];
}

@end
