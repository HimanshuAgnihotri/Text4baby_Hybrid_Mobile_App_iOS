//
//  Support.m
//  nT4B2b
//
//  Created by Gustavo on 11/27/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "Support.h"
#import "ContactUsViewController.h"
#import "SignInViewController.h"
#import "SignUpViewController.h"
#import "AppDelegate.h"

@implementation Support

+ (UIImage *) getScreenshot
{
    UIWindow *keyWindow = [[UIApplication sharedApplication] keyWindow];
    CGRect rect = [keyWindow bounds];
    UIGraphicsBeginImageContextWithOptions(rect.size,YES,0.0f);
    CGContextRef context = UIGraphicsGetCurrentContext();
    [keyWindow.layer renderInContext:context];
    UIImage *capturedScreen = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return capturedScreen;
}

+ (void) setBackgroundForView: (UIView*) view
{
    UIGraphicsBeginImageContext(view.frame.size);
    [[UIImage imageNamed:@"t4b-background-01.png"] drawInRect:view.bounds];
//    [[UIImage imageNamed:@"iPadBackgroundTexture-grey.png"] drawInRect:view.bounds];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    view.backgroundColor = [UIColor colorWithPatternImage: image];
}

+ (void) disableWebLinkForWebView: (UIWebView*) pWebView
{
    // Disable user selection
    [pWebView stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitUserSelect='none';"];
    // Disable callout
    [pWebView stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitTouchCallout='none';"];
}

+ (void) updateAllowedOrientationsTo: (NSUInteger) orientation
{
    AppDelegate *appdelegate;
    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    appdelegate.allowedOrientations = orientation;
}
/*
+ (void) updateStatusBarStyle: (UIStatusBarStyle) style
{
    AppDelegate *appdelegate;
    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    appdelegate.allowedOrientations = orientation;
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
}
*/
+ (void) LogURL: (NSURLRequest *)request
{
    NSLog (@"URL.lastPathComponent: %@",request.URL.lastPathComponent);
    NSLog (@"URL.scheme: %@",request.URL.scheme);
    NSLog (@"URL.parameterString: %@",request.URL.parameterString);
    NSLog (@"URL.resourceSpecifier: %@",request.URL.resourceSpecifier);
    NSLog (@"URL.query: %@", request.URL.query);
}
/*
+ (void)presentSignUp:(SignUpFunctions)nextScreen Over: (UINavigationController*) pNavController AsRoot:(BOOL) pAsRoot
{
    SignUpViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                          bundle:nil] instantiateViewControllerWithIdentifier:@"sign-upVC"];
    vc.screenFunction = nextScreen;
    if (pAsRoot)
        [self.navigationController setViewControllers:[NSArray arrayWithObjects:vc, nil] animated:NO];
    else
        [self.navigationController pushViewController:vc animated:YES];
}
+ (void)setSignUpAsRoot:(SignUpFunctions)nextScreen Over: (UINavigationController*) pNavController
{
    SignUpViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                          bundle:nil] instantiateViewControllerWithIdentifier:@"sign-upVC"];
    vc.screenFunction = nextScreen;
    [self.navigationController setViewControllers:[NSArray arrayWithObjects:vc, nil] animated:NO];
}
*/
+ (void)presentContactUsOver: (UINavigationController *) pNavController
{
//    ContactUsViewController *viewController = [[ContactUsViewController alloc] initWithURL:nil];
    ContactUsViewController *viewController = [[ContactUsViewController alloc] init];
    [pNavController pushViewController:viewController animated:YES];
}

+ (MainTabBarController *) getMainTabBarAndContentWithJSON: (NSString*) jsonParam
{
    NSInteger t4bWeek;
    T4bProtocols t4bProtocol;
    
    // Extract Week and Protocol from JSON parameters
    NSData* data = [jsonParam dataUsingEncoding:NSUTF8StringEncoding];
    if (data != nil)
    {
        NSDictionary *jsonDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        t4bWeek = [[jsonDictionary objectForKey:@"week"] intValue];
        t4bProtocol = [[jsonDictionary objectForKey:@"mode"] intValue];
        NSLog(@"Protocol %lu, Week: %lu", (unsigned long)t4bProtocol, (unsigned long)t4bWeek);
    }
    
    MainTabBarController *controller = [[UIStoryboard storyboardWithName:@"Main_iPhone"
                                                                  bundle:nil] instantiateViewControllerWithIdentifier:@"MainTabBar"];
    controller.userT4bProtocol = t4bProtocol;
    controller.userWeek = t4bWeek;
    controller.backgroundImage = [Support getScreenshot]; // Screenshot to be used as background while the tab bar is loading all content
    return controller;
}

+ (UIViewController*) getRootLogin
{
    // Create root view with sign-in view controller
    UINavigationController *nc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                                  instantiateViewControllerWithIdentifier:@"Splash"];
    SignInViewController *vc = (SignInViewController *) [nc.viewControllers objectAtIndex:0]; // Locate root SignInViewController
    vc.screenFunction = SignInFunctionSignIn; // Set as SignIn
    return nc;
}
+ (UIViewController*) getWaitViewControllerWithBackground: (UIColor *) color
{
    UIViewController *vc = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil] instantiateViewControllerWithIdentifier:@"GetReady"];
    vc.view.backgroundColor = color;
    return vc;
}
+ (UIViewController *) getWindowRoot
{
    UIWindow *topWindow = [[UIApplication sharedApplication] keyWindow];
    UIViewController *rootView = [topWindow rootViewController];
    return rootView;
}

/*
+ (ContactUsViewController *) getContactUs
{
    
}
*/
+ (void) ProcessAPIwithJSON: (NSString*)pJSON onWebView:(UIWebView *) pWebView showing: (UIViewController*) pWait overViewController: (UIViewController *) pVC
{
//    NSString *temp = [pJSON substringFromIndex:7];
    NSString *temp = [pJSON substringFromIndex:NSMaxRange([pJSON rangeOfString:@"#"])]; // Remove page name
    NSData* data = [temp dataUsingEncoding:NSUTF8StringEncoding];
    if (data != nil)
    {
        NSDictionary *jsonDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
        NSDictionary *jsonRequest = [jsonDictionary valueForKey:@"str"];
        NSData *tempData = [NSJSONSerialization dataWithJSONObject:jsonRequest options:0 error:nil];
        NSString *str = [[NSString alloc] initWithData:tempData encoding:NSUTF8StringEncoding];
        NSString *action = [jsonDictionary objectForKey:@"action"];
        NSString *subaction = [jsonDictionary objectForKey:@"subaction"];
        
        NSString *JS = [NSString stringWithFormat:@"transaction2(JSON.stringify(%@), \"%@\", \"%@\");", str, action, subaction];
        NSLog(@"JS: %@", JS);
        
        if (! ([action isEqualToString:@"isLatestVersion"] ||
               [action isEqualToString:@"getParticipantAppointmentsByType"] ||
               [action isEqualToString:@"subscribe"])
            )
            if (pWait !=nil)
                if (pWait.view.superview == nil) [pVC.view addSubview: pWait.view]; // Show wait screen if not already done
        [pWebView stringByEvaluatingJavaScriptFromString: JS]; // Call transaction2 on process.js
    }
}

+ (errorAlertType) ProcessJSErrorsUsingURL: (NSURLRequest *) request andDelegate: (id) pDelegate
{
    errorAlertType alertType;
    
    NSString *urlFileName = request.URL.lastPathComponent;
    NSString *errorString = [request.URL.resourceSpecifier stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
//    errorMsg = [errorMsg substringFromIndex:NSMaxRange([errorMsg rangeOfString:@"#"])];

    // Keep only characters after # sign; keep original if no #
    NSInteger index = NSMaxRange([errorString rangeOfString:@"#"]);
    if (index < errorString.length) errorString = [errorString substringFromIndex:index];
    
    // errorMsg may contain multiple errors comma separated. Replace all commas with CR to display them together with an Alert
    NSMutableString *errorMsg = [NSMutableString stringWithString:errorString];
    [errorMsg replaceOccurrencesOfString:@"," withString:@"\n" options:0 range:NSMakeRange(0, errorMsg.length)];
/*
    // Former code that extracted only the first message (until first comma)
    index = [errorMsg rangeOfString:@","].location;
    if (errorMsg.length > index)
        errorMsg = [errorMsg substringToIndex: index];
*/
    NSLog(@"JS Error Detected !!! -> %@", urlFileName);
    UIAlertView *alert;
    alertType = errorAlertNone;

    // Initial
    if ( [urlFileName isEqualToString: (@"initial-alert-message.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Please go to your app store and update the newest version of Text4baby.  Your current version is no longer supported and we want you to have all the newest features of the app." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
        alertType = errorAlertAppNeedsUpdate;
    }
    // Sign In
    else if ( [urlFileName isEqualToString: (@"signin-account-lock.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"Your account has been locked" message: @"Please use the Forgot Password link or e-mail us at app@text4baby.org to have your account reset." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signin-screen1-phnnum-pwd.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"We couldn't log you in" message: @"Your mobile phone number or password is incorrect." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signin-screen2-no-phnnum.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"There's no Text4baby account for this phone number" message: @"Check the phone number and try again." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signin-screen2-phnnum.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"We couldn't reset your password" message: @"You must enter a 10-digit cell phone number." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signin-screen4-confrm-pwd.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error resetting your password" message: @"Passwords don't match." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signin-screen4-pwd.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error resetting your password" message: @"Password format is not correct." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signin-second-user.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"We couldn't log you in" message: @"Sorry, you can not log in to this account with this mobile phone. Another account has already been registered with your mobile phone. Please contact support@voxiva.com if you have any issues." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"splash-communication-error.html")] ) // Verified working
        alert = [[UIAlertView alloc] initWithTitle: @"System error" message: @"There was an error contacting the service. Please try again." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];

    // Sign Up
    else if ( [urlFileName isEqualToString: (@"signup-resend-code.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Code has been resent" message: @"We have resent the security code via text message to your mobile phone. Each time a new code is requested, old security codes will no longer work." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    }
    else if ( [urlFileName isEqualToString: (@"signup-screen1-phn.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Cell phone number must be 10-digits long." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen2-baby-fname.html")] || [urlFileName isEqualToString: (@"signup-screen4-baby-fname.html")])
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Please enter baby's first name." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen2-confrm-pwd.html")] || [urlFileName isEqualToString: (@"signup-screen4-confrm-pwd.html")])
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Passwords don't match." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen2-duplicate-email.html")] || [urlFileName isEqualToString: (@"signup-screen4-duplicate-email.html")]) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"The email address you entered is already registered in our system. Please enter a different email address." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen2-email.html")] || [urlFileName isEqualToString: (@"signup-screen4-email.html")])
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Invalid email address." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen2-fname.html")] || [urlFileName isEqualToString: (@"signup-screen4-fname.html")])
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Please enter your first name." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen2-pwd.html")] || [urlFileName isEqualToString: (@"signup-screen4-pwd.html")])
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Password format is not correct." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    
    else if ( [urlFileName isEqualToString: (@"signup-screen3-code.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"The code you entered is invalid or expired" message: @"Please make sure you are entering the last security code received via text message." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    
    else if ( [urlFileName isEqualToString: (@"signup-screen4-baby-bday.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Baby's birthday is not valid. Text4baby provides tips through baby's first year. Please enter a date within the last year." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen4-ddate-bbday.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Date cannot be more than 12 months in the past nor more than 9 months in the future." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen4-duedate.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Due date is not valid. Please enter a date in the future that is not more than 9 months from today." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen4-iam.html")] ) // Showing Null
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: errorMsg delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen4-mperiod.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"The date of your last menstrual period cannot be in the future or more than 9 months in the past." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen4-zcode.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Invalid zip code." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"signup-screen5-terms-ppolicy.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Please accept the Terms and Conditions and Privacy Policy." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"user-dont-exist.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"System error" message: @"Phone number already exists." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    
    // Calendar
    else if ( [urlFileName isEqualToString: (@"calendar-messagesettings-alert.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"To set a text message reminder for your appointment, you must turn your text messages ON. Click on Message Settings below to turn your text messages on." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"Message Settings", @"Close", nil];
        alertType = errorAlertCalendarMessageSettings;
    }
    else if ( [urlFileName isEqualToString: (@"calendar-no-date.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your appointment reminder." message: @"Please enter a valid appointment date." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"calender-date-appointment.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your appointment reminder." message: @"Please enter a date in the future." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    
    // More Options
    else if ( [urlFileName isEqualToString: (@"more-clear-data.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"You will now return to the Sign In Screen. After you log in with your phone number and password, please go to More and update your due date or baby's age." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
        alertType = errorAlertMoreClearData;
    }
    else if ( [urlFileName isEqualToString: (@"more-message-setting-off-to-on.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Text4baby will now send you FREE text messages with personalized health information for you and your baby." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
        alertType = errorAlertMoreMessageSetting_OffToOn;

    }
    else if ( [urlFileName isEqualToString: (@"more-message-setting.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Are you sure? These weekly messages offer critical information personalized to your pregnancy or baby’s age." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"Yes", @"No", nil];
        alertType = errorAlertMoreMessageSetting;
    }
    else if ( [urlFileName isEqualToString: (@"more-screen1-baby-name.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error changing your settings." message: @"Please enter baby's first name." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    else if ( [urlFileName isEqualToString: (@"more-screen1-ddate.html")] ) // Verified
        alert = [[UIAlertView alloc] initWithTitle: @"There was an error changing your settings." message: @"Date cannot be more than 12 months in the past nor more than 9 months in the future." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];

    // Contact Us
    else if ( [urlFileName isEqualToString: (@"contact-us-confirmation-message.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"Text4baby" message: @"Thank you for contacting us. We will review your question or comment and contact you shortly if needed." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"OK", nil]; // Verified
    else if ( [urlFileName isEqualToString: (@"contactus-invalid-email.html")] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Text4baby" message: errorMsg  delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil]; // Verified
    }
    else if ( [urlFileName isEqualToString: (@"contactus-invalid-pnum.html")] )
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Invalid phone number." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil]; // Verified
    
    
    // Add Checklist Item Blank Check
    else if ( [urlFileName isEqualToString: @"checklist-blank.html"] )
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Please enter a valid description." delegate: pDelegate cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
        alertType = errorAlertMoreClearData;
    }
    else
    {
        alert = [[UIAlertView alloc] initWithTitle: @"Connection Error" message: @"There was an error contacting the service. Please try again." delegate: nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
    }
    // Show Alert if error was identified
    if (alert!=nil) [alert show];
    return alertType;
}
@end
