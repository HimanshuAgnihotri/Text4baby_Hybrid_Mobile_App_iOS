//
//  ErrorHandler.m
//  nT4B2b
//
//  Created by Gustavo on 11/6/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "ErrorHandler.h"

@implementation ErrorHandler
{
    ErrorActions button1;
    ErrorActions result;
}
/*
-(id)initWithError:(NSString *)errorMsg forPath:(NSString *)errorPath
{
    self = [super init];
    if(self)
    {
        self.ErrorMsg = errorMsg;
        self.ErrorPath = errorPath;
    }
    return self;
}
 */

-(ErrorActions)evaluateError:(NSString *)errorMsg forPath:(NSString *)errorPath
{
    result = ErrorActionNone;
    button1 = ErrorActionNone;
/*
 // Calendar
    if ( [errorPath isEqualToString: (@"calendar-messagesettings-alert.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"To set a text message reminder for your appointment, you must turn your text messages ON. Click on Message Settings below to turn your text messages on." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Message Settings", @"Close", nil];
        button1 = ErrorActionGoToMessageSettings;
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"calendar-no-date.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your appointment reminder." message: @"Please enter a valid appointment date." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"calender-date-appointment.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your appointment reminder." message: @"Please enter a date in the future." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
 */
/*
    // Contact Us
    if ( [errorPath isEqualToString: (@"contact-us-confirmation-message.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Thank you for contacting us. We will review your question or comment and contact you shortly if needed." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"contactus-invalid-email.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Text4baby" message: errorMsg delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        //            alert.cancelButtonIndex = 1; // Second button to cancel
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"contactus-invalid-pnum.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Invalid phone number." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
 */
    
    // More
/*
    if ( [errorPath isEqualToString: (@"more-clear-data.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"You will now return to the Sign In Screen. After you log in with your phone number and password, please go to More and update your due date or baby's age." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"more-message-setting-off-to-on.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Text4baby will now send you FREE text messages with personalized health information for you and your baby." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"more-message-setting.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"Alert" message: @"Are you sure? These weekly messages offer critical information personalized to your pregnancy or baby’s age." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Yes", @"No", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"more-screen1-baby-name.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error changing your settings." message: @"Please enter baby's first name." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"more-screen1-ddate.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error changing your settings." message: @"Date cannot be more than 12 months in the past nor more than 9 months in the future." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
 */
    
    // Sign In
/*
    if ( [errorPath isEqualToString: (@"signin-screen1-phnnum-pwd.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"We couldn't log you in" message: @"Your mobile phone number or password is incorrect." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"signin-screen2-no-phnnum.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There's no Text4baby account for this phone number" message: @"Check the phone number and try again." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"signin-screen2-phnnum.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"We couldn't reset your password" message: @"You must enter a 10-digit cell phone number." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"signin-screen4-confrm-pwd.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error resetting your password" message: @"Passwords don't match." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"signin-screen4-pwd.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error resetting your password" message: @"Password format is not correct." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"signin-second-user.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"We couldn't log you in" message: @"Sorry, you can not log in to this account with this mobile phone. Another account has already been registered with your mobile phone. Please contact support@voxiva.com if you have any issues." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
 */
    
    // Sign Up
    
    if ( [errorPath isEqualToString: (@"signin-screen2-no-phnnum.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"The email address you entered is already registered in our system. Please enter a different email address." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"signup-screen5-terms-ppolicy.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"There was an error creating your account" message: @"Please accept the Terms and Conditions and Privacy Policy." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    if ( [errorPath isEqualToString: (@"splash-communication-error.html")] )
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"System error" message: @"There was an error contacting the service. Please try again." delegate: self cancelButtonTitle:nil otherButtonTitles:@"Ok", nil];
        [alert show];
    }
    return result;
}



@end
