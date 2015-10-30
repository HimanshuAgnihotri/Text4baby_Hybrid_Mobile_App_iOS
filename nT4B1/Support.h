//
//  Support.h
//  nT4B2b
//
//  Created by Gustavo on 11/27/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "T4bDefinitions.h"

@class MainTabBarController;

@interface Support : NSObject

+ (UIImage *) getScreenshot;
+ (void) setBackgroundForView: (UIView*) view;
+ (void) disableWebLinkForWebView: (UIWebView*) pWebView;
+ (void) updateAllowedOrientationsTo: (NSUInteger) orientation;
+ (void) LogURL: (NSURLRequest *)request;
+ (UIViewController *) getWindowRoot;

+ (void)presentContactUsOver: (UINavigationController *) pNavController;

+ (MainTabBarController *) getMainTabBarAndContentWithJSON: (NSString*) jsonParam;
+ (UIViewController*) getRootLogin;
+ (UIViewController*) getWaitViewControllerWithBackground: (UIColor *) color;

+ (void) ProcessAPIwithJSON: (NSString*)pJSON onWebView:(UIWebView *) pWebView showing: (UIViewController*) pWait overViewController: (UIViewController *) pVC;
+ (errorAlertType) ProcessJSErrorsUsingURL: (NSURLRequest *) request andDelegate: (id) pDelegate;

@end
