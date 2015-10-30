//
//  LoginViewController.m
//  nT4B1
//
//  Created by Gustavo on 5/25/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "LoginViewController.h"
#import "BrowserViewController.h"
#import "MediaPlayer/MediaPlayer.h"
#import "AppDelegate.h"
#import "ContactUsViewController.h"
//#import "MPMoviePlayerViewController.h"

@interface LoginViewController ()
{
    AppDelegate *appdelegate;
    MPMoviePlayerViewController *movieController;
}

@end

@implementation LoginViewController

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

    self.theWebView.delegate = self;

    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;

    // Prepare page to load based on storyboad screen
    NSString *path;
    //Locate the initial page
    // Get phone number to determine if user can sign-in, create T4B password or must link existing account with T4B
    if ([self.title isEqual:@"sign-up"]) path = [[NSBundle mainBundle] pathForResource:@"sign-up" ofType:@"html" inDirectory:@"www"];
    // Screens to create a T4B password
    else if ([self.title isEqual:@"signup-tell-us.html"]) path = [[NSBundle mainBundle] pathForResource:@"signup-tell-us" ofType:@"html" inDirectory:@"www"];
    else if ([self.title isEqual:@"signup-finish.html"]) path = [[NSBundle mainBundle] pathForResource:@"signup-finish" ofType:@"html" inDirectory:@"www"];
    // Screens to link account
    else if ([self.title isEqual:@"signup-link.html"]) path = [[NSBundle mainBundle] pathForResource:@"signup-link" ofType:@"html" inDirectory:@"www"];
    else if ([self.title isEqual:@"signup-code.html"]) path = [[NSBundle mainBundle] pathForResource:@"signup-code" ofType:@"html" inDirectory:@"www"];
    else path = [[NSBundle mainBundle] pathForResource:@"sign-in" ofType:@"html" inDirectory:@"www"];

//    path = [[NSBundle mainBundle] pathForResource:@"sign-in" ofType:@"html" inDirectory:@"www"];
    
    // Start login page
    NSLog(@"LoginViewController -> ViewDidLoad path %@", path);
    [self.theWebView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
    //    [[self.theWebView.subviews objectAtIndex:0] setBounces:NO];
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
//- (void)webViewDidStartLoad:(UIWebView *)webView
{
    // Analyze all URLs the browser is navigating to detect when a native screen should be presented
//    if (navigationType == UIWebViewNavigationTypeLinkClicked )
    NSLog (@"shouldStartLoadWithRequest URL.absoluteString: %@",request.URL.absoluteString);
    NSLog (@"URL.lastPathComponent: %@",request.URL.lastPathComponent);
    NSLog (@"URL.scheme: %@",request.URL.scheme);
    NSLog (@"URL.parameterString: %@",request.URL.parameterString);
    NSLog (@"URL.query: %@",request.URL.query);
    
    NSString *urlFileName = request.URL.lastPathComponent;
        // Actions to be reviewed on any screen
        if ([urlFileName isEqualToString: (@"timeline.html")])
        {
            [self performSegueWithIdentifier: @"TimelineNav" sender: self];
            return NO;
        }
        if ([urlFileName isEqualToString: (@"contact-us.html")])
        {
            ContactUsViewController *viewController = [[ContactUsViewController alloc] initWithURL:request.URL];
            [self addChildViewController:viewController];
            viewController.title = @"Contact Us";
            [viewController.navigationItem.backBarButtonItem setTitle: @"Back"];
//            [[viewController view] awakeFromNib];
//            [self.view addSubview:viewController.view];
//            [viewController view];
//            sleep(2);
            [self.navigationController pushViewController:viewController animated:YES];
            return NO;
//            return YES;
        }
        // Actions to be reviewed when on the SIGN-UP screen
    if ([urlFileName isEqualToString: (@"video.html")])
    {
        //
        NSString*thePath=[[NSBundle mainBundle] pathForResource:@"welcomevideo" ofType:@"mp4"];
        NSURL*theurl=[NSURL fileURLWithPath:thePath];
        
        movieController = [[MPMoviePlayerViewController alloc] initWithContentURL:theurl];
        // Let the AppDeleagete know it should force Landscape
        appdelegate.isFullScreen = TRUE;
        [self presentMoviePlayerViewControllerAnimated:movieController];
        [movieController.moviePlayer play];
        return NO;
    }
        if ([self.title isEqual:@"sign-up"])
        {
            if (navigationType == UIWebViewNavigationTypeLinkClicked )
            {
                    BrowserViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                                                       bundle:nil] instantiateViewControllerWithIdentifier:@"sign-upVC"];
                    viewController.targetURL = request.URL;
                    viewController.theWebView.delegate = self;
                    [self.navigationController pushViewController:viewController animated:YES];
                return NO;
            }
            if (navigationType == UIWebViewNavigationTypeOther )
            {
                NSLog(@"Login -> Navigating to: %@", urlFileName);
                if ([urlFileName isEqualToString: (@"signup-tell-us.html")] ||
                    [urlFileName isEqualToString: (@"signup-finish.html")] ||
                    [urlFileName isEqualToString: (@"signup-link.html")] ||
                    [urlFileName isEqualToString: (@"signup-code.html")]
                    )
                {
                    BrowserViewController *viewController = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                                                       bundle:nil] instantiateViewControllerWithIdentifier:@"sign-upVC"];
                    viewController.title = urlFileName;
//                    viewController.targetURL = request.URL;
//                    viewController.targetDelegate = self;
    //                viewController.theWebView.delegate = self;
                    [self.navigationController pushViewController:viewController animated:YES];
                    return NO;
                }
            }
    }
    return YES;
}
/*
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([segue.identifier isEqualToString:@"TopicBrowse"])
    {
        // Give the Sync dialog access to the web view where the mobile app is running
//        UITabBarController *nextViewController = segue.destinationViewController;
//        nextViewController.targetURL = self.targetURL;
    }
}
*/
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
