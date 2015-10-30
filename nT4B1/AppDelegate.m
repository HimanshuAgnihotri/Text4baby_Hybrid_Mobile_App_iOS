//
//  AppDelegate.m
//  nT4B1
//
//  Created by Gustavo on 5/2/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "AppDelegate.h"
#import <MediaPlayer/MediaPlayer.h>


@implementation AppDelegate
{

}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    
    self.isFullScreen = NO; // Controls what orientation is allowed. Only allow Landscape on fullscreen video playback
    self.allowedOrientations = UIInterfaceOrientationMaskPortrait;

    int cacheSizeMemory = 4*1024*1024; // 4MB
    int cacheSizeDisk = 32*1024*1024; // 32MB
    NSURLCache *sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
    [NSURLCache setSharedURLCache:sharedCache];

    if ([[[UIDevice currentDevice] systemVersion] intValue] < 7)
    {
        // iOS 6 NavigationBar Background
        [[UINavigationBar appearance] setTintColor: [UIColor colorWithRed:250.0/255.0 green:20.0/255.0 blue:160.0/255.0 alpha:1]];
        // iOS 6 NavigationBar Button Background
        [[UIBarButtonItem appearance] setTintColor: [UIColor colorWithRed:0 green:122.0/255.0 blue:200.0/255.0 alpha:1]];

        // Buttons on Navigation Bar: Font and Coloer
        [[UIBarButtonItem appearance] setTitleTextAttributes:
         [NSDictionary dictionaryWithObjectsAndKeys:
          [UIFont fontWithName:@"VAGRoundedStd-Light" size:14.0], UITextAttributeFont,
//          [UIColor colorWithRed:0.0/255.0 green:91.0/255.0 blue:255.0/255.0 alpha:1.0], UITextAttributeTextColor,
          nil] forState:UIControlStateNormal];
        
        [[UIBarButtonItem appearance] setTitleTextAttributes:
         [NSDictionary dictionaryWithObjectsAndKeys:
          [UIFont fontWithName:@"VAGRoundedStd-Light" size:14.0], UITextAttributeFont,
          [UIColor colorWithRed:0 green:0 blue:1 alpha:1.0], UITextAttributeTextColor, nil] forState:UIControlStateSelected];
    }
    else
    {
        // iOS 7 NavigationBar Background
//        [[UINavigationBar appearance] setBarTintColor: [UIColor colorWithRed:252.0/255.0 green:52.0/255.0 blue:172.0/255.0 alpha:1]]; // First
//        [[UINavigationBar appearance] setBarTintColor: [UIColor colorWithRed:227.0/255.0 green:0.0/255.0 blue:122.0/255.0 alpha:1]]; // Official
        [[UINavigationBar appearance] setBarStyle:UIBarStyleBlack];

        [[UINavigationBar appearance] setBarTintColor: [UIColor colorWithRed:237.0/255.0 green:15.0/255.0 blue:145.0/255.0 alpha:1]];
        // iOS 7 NavigationBar Button Text Color
        [[UINavigationBar appearance] setTintColor: [UIColor colorWithRed:0 green:91.0/255.0 blue:255.0/255.0 alpha:1]]; // Blue buttons
        [[UINavigationBar appearance] setTintColor: [UIColor colorWithRed:1 green:1 blue:255.0/255.0 alpha:1]]; // White buttons

        // Buttons on Navigation Bar: Font and Coloer
        [[UIBarButtonItem appearance] setTitleTextAttributes:
         [NSDictionary dictionaryWithObjectsAndKeys:
          [UIFont fontWithName:@"VAGRoundedStd-Light" size:18.0], UITextAttributeFont,
//          [UIColor colorWithRed:0.0/255.0 green:91.0/255.0 blue:255.0/255.0 alpha:1.0], UITextAttributeTextColor,
          [UIColor colorWithRed:255.0/255.0 green:255.0/255.0 blue:255.0/255.0 alpha:1.0], UITextAttributeTextColor,
          nil] forState:UIControlStateNormal];
/* really necessary?
        [[UIBarButtonItem appearance] setTitleTextAttributes:
         [NSDictionary dictionaryWithObjectsAndKeys:
          [UIFont fontWithName:@"VAGRoundedStd-Light" size:18.0], UITextAttributeFont,
          [UIColor colorWithRed:0 green:0 blue:1 alpha:1.0], UITextAttributeTextColor, nil] forState:UIControlStateSelected];
 */
    }

//    [[UITabBarItem appearance] setTitleTextAttributes:@{UITextAttributeFont:[UIFont boldSystemFontOfSize:13]} forState:UIControlStateNormal];
//    [[UITabBar appearance] setSelectedImageTintColor:[UIColor colorWithRed:200.0/255.0 green:24.0/255.0 blue:22.0/255.0 alpha:1]];

/*
    // List all existing fonts
    for (NSString* family in [UIFont familyNames]) {
        NSLog(@"%@", family);
        for (NSString* name in [UIFont fontNamesForFamilyName: family]) NSLog(@"  %@", name); }
*/
    [[UINavigationBar appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor colorWithRed:255.0/255.0 green:250.0/255.0 blue:250.0/255.0 alpha:1.0],
      UITextAttributeTextColor,
      [UIColor colorWithRed:0.25 green:0.25 blue:0.25 alpha:0.5],
      UITextAttributeTextShadowColor,
      [NSValue valueWithUIOffset:UIOffsetMake(1, 1)],
      UITextAttributeTextShadowOffset,
      [UIFont fontWithName:@"VAGRoundedStd-Bold" size:22.0],
      UITextAttributeFont,
      nil]];


    // Tab Bar Font and Color
    [[UITabBarItem appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor colorWithRed:0.0/255.0 green:91.0/255.0 blue:255.0/255.0 alpha:1.0], UITextAttributeTextColor,
      [UIFont fontWithName:@"VAGRoundedStd-Light" size:14.0], UITextAttributeFont,
      nil] forState:UIControlStateSelected];
    // Tab Bar Font and Color
    [[UITabBarItem appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor colorWithRed:120.0/255.0 green:120.0/255.0 blue:120.0/255.0 alpha:1.0], UITextAttributeTextColor,
      [UIFont fontWithName:@"VAGRoundedStd-Light" size:14.0], UITextAttributeFont,
      nil] forState:UIControlStateNormal];

    // Notification to stop video playback and force back portrait mode
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(playbackFinished:)
                                                 name:MPMoviePlayerPlaybackDidFinishNotification
                                               object:nil];
    return YES;
}
							
- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


- (void)playbackFinished:(NSNotification*)notification
{
    NSLog(@"AppDelegate -> playbackFinished");
    self.isFullScreen = NO;
}

-(NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{

    //    Force landscape mode only when isFullScreen is set to TRUE. To be used on video playback
    if (self.isFullScreen)
        return UIInterfaceOrientationMaskLandscapeLeft + UIInterfaceOrientationMaskLandscapeRight;
    else
        return UIInterfaceOrientationMaskPortrait;
//        return self.allowedOrientations;
//        return UIInterfaceOrientationMaskAll;
}
@end
