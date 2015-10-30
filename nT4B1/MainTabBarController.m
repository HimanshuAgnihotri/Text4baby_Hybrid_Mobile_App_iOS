//
//  MainTabBarController.m
//  nT4B2
//
//  Created by Gustavo on 7/1/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "MainTabBarController.h"
#import "SwapViewController.h"
#import "CalendarViewController.h"
#import "MoreViewController.h"
#import "BrowserSwipeViewController.h"
//#import "AppDelegate.h"
#import "TopicsViewController.h"

@interface MainTabBarController ()
{
////    AppDelegate *appdelegate;

    BrowserSwipeViewController *vcTimelinePreg;
    BrowserSwipeViewController *vcTimelineBaby;
    CalendarViewController *vcCalendarPreg;
    CalendarViewController *vcCalendarBaby;
    TopicsViewController *vcTopicsPreg;
    TopicsViewController *vcTopicsBaby;
    
    UIViewController *vcWait;
    UIViewController *vcWelcome;
    BOOL firstTime;
    NSInteger initWaitSeconds;
    NSInteger initLoadedWebViews;
}

@end

@implementation MainTabBarController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        initWaitSeconds = 0;
        initLoadedWebViews = 0;
    }
    return self;
}
-(void)onWait:(NSTimer *)timer {
    initWaitSeconds++;
    if (initWaitSeconds > 15 || initLoadedWebViews >= 10)
    {
        [vcTimelinePreg weekBarSetupAndWelcome]; // Prepare Week Navigation Bar. Show Welcome Back if necessary. Hide bar for Topics.
        [vcTimelineBaby weekBarSetupAndWelcome]; // Timer initialized only once this onWait is called

        // Fade out snapshot with wait screen
        [UIView animateWithDuration:0.5
                         animations:^{
                             vcWait.view.alpha = 0;
                         }
                         completion:^(BOOL x){
                             [vcWait.view removeFromSuperview];
                         }
         ];
        
        //TODO: Load More
        // Forces bug
        UINavigationController* nc = (UINavigationController*)[self.viewControllers objectAtIndex:3];
        [[nc.viewControllers objectAtIndex:0] view];
        
        if (firstTime) // Show purple welcome?
        {
            vcWelcome = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil] instantiateViewControllerWithIdentifier:@"Welcome"];
            [self.view addSubview:vcWelcome.view];
        }
        [timer invalidate ];
    }
}
-(void)countWebCompletions
{
    initLoadedWebViews++;
    NSLog(@"countWebCompletions: %li", (long)initLoadedWebViews);
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    firstTime = NO;
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString *userFirstTime = [defaults objectForKey:@"userFirstTime"];
    if (![userFirstTime isEqualToString:@"YES"])
    {
        [defaults setObject:@"YES" forKey:@"userFirstTime"];
        [defaults synchronize];
        firstTime = YES;
    }

    vcWait = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil] instantiateViewControllerWithIdentifier:@"GetReady"];
    vcWait.view.backgroundColor = [UIColor colorWithPatternImage: self.backgroundImage];// [UIImage imageNamed:@"t4b-background-01.png"]];
    [self.view addSubview:vcWait.view];

    [NSTimer scheduledTimerWithTimeInterval:1.0
                                     target:self
                                   selector:@selector(onWait:)
                                   userInfo:nil
                                    repeats:YES];

    // Tab Bar Presentation
    NSLog(@"*** MainTabBarController -> viewDidLoad");
////    appdelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    self.delegate = self;

  /*  UITabBarItem *tabBarItem = [self.tabBar.items objectAtIndex:0];
    tabBarItem.selectedImage = [UIImage imageNamed: @"tab-timeline-02b"];
    tabBarItem = [self.tabBar.items objectAtIndex:1];
    tabBarItem.selectedImage = [UIImage imageNamed: @"tab-calendar-02b"];
    tabBarItem = [self.tabBar.items objectAtIndex:2];
    tabBarItem.selectedImage = [UIImage imageNamed: @"tab-calendar-02b"];
    tabBarItem = [self.tabBar.items objectAtIndex:3];
    tabBarItem.selectedImage = [UIImage imageNamed: @"tab-topics-02b"];
    tabBarItem = [self.tabBar.items objectAtIndex:4];
    tabBarItem.selectedImage = [UIImage imageNamed: @"tab-more-02b"];*/

    // TODO: Keep protocol in TabBar instead of AppDelegate
//    appdelegate.visibleProtocol = self.userT4bProtocol;
    self.visibleProtocol = self.userT4bProtocol; // Protocol user is currently view equals protocol user is enrolled in

    // ****************************************************************************************************
    // Prepare 2 Timeline controllers and add them to SwapViewController for TAB 1
    // ****************************************************************************************************
    
    // Create PREGNANCY Timeline ViewConroller, assign its content list and location of web pages
    NSLog(@"*** MainTabBarController -> viewDidLoad -> Building Pregnancy SwipeViewController");
    vcTimelinePreg = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                           instantiateViewControllerWithIdentifier:@"SwipeBrowser"];
    vcTimelinePreg.contentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TimelinePreg" ofType:@"plist"]];
    vcTimelinePreg.contentLocation = @"www";
    vcTimelinePreg.hasWeekNav = YES;
    vcTimelinePreg.hasAccordions = YES;
    vcTimelinePreg.t4bBlockPrefix = @"preg";
    vcTimelinePreg.imageLocation = @"www/images/timeline/pregnancy-tab1";
    vcTimelinePreg.weekOffset = 4;
    vcTimelinePreg.showWelcomeTitle = NO;
////    vcTimelinePreg.userWeek = -1;
    vcTimelinePreg.vcProtocol = T4bProtocolPregnancy;
    
    // Create NEW BABY Timeline ViewConroller, assign its content list and location of web pages
    NSLog(@"*** MainTabBarController -> viewDidLoad -> Building New Baby SwipeViewController");
    vcTimelineBaby = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                           instantiateViewControllerWithIdentifier:@"SwipeBrowser"];
    vcTimelineBaby.contentList = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"TimelineBaby" ofType:@"plist"]];
    vcTimelineBaby.contentLocation = @"www";
    vcTimelineBaby.hasWeekNav = YES;
    vcTimelineBaby.hasAccordions = YES;
    vcTimelineBaby.t4bBlockPrefix = @"baby";
    vcTimelineBaby.imageLocation = @"www/images/timeline/baby-tab1";
    vcTimelineBaby.weekOffset = 1;
    vcTimelineBaby.showWelcomeTitle = NO;
////    vcTimelineBaby.userWeek = -1;
    vcTimelineBaby.vcProtocol = T4bProtocolNewBaby;

    // Set appropriate page for each timeline
    NSInteger pagePreg = 38;
    NSUInteger pageBaby = 0;
    if (self.userT4bProtocol == T4bProtocolPregnancy)
    {
        pagePreg = [self getPageFromPregWeek:self.userWeek];
////        pagePreg = (NSInteger)self.userWeek - 4; // Week 4 is first page (0)
////        if (pagePreg < 0 || pagePreg >= vcTimelinePreg.contentList.count) pagePreg = 0; // Ensure value is within range or default to first page
        if (!firstTime) vcTimelinePreg.showWelcomeTitle = YES; // Show Welcome Back only for landing protocol, and only if not first time
        vcTimelinePreg.userFirstName = self.userFirstName;
        vcTimelinePreg.userWeek = pagePreg;
    }
    if (self.userT4bProtocol == T4bProtocolNewBaby)
    {
        pageBaby = [self getPageFromBabyWeek:self.userWeek];
////        pageBaby = self.userWeek - 1;  // Ensure value is within range or default to first page
////        if (pageBaby >= vcTimelineBaby.contentList.count) pageBaby = vcTimelineBaby.contentList.count-1;
        if (!firstTime) vcTimelineBaby.showWelcomeTitle = YES;  // Show Welcome Back only for landing protocol, and only if not first time
        vcTimelineBaby.userFirstName = self.userFirstName;
        vcTimelineBaby.userWeek = pageBaby;
    }

    [vcTimelinePreg setPageTo:pagePreg];
    [vcTimelineBaby setPageTo:pageBaby];

    // Locate instance of SwapViewController to load its Preg/Baby View Controllers
    SwapViewController *svc = [[[self.viewControllers objectAtIndex:0] viewControllers] objectAtIndex:0];
    //  SwapViewController *svc = [self.viewControllers objectAtIndex:0];
    svc.vc1 = vcTimelinePreg;
    svc.vc2 = vcTimelineBaby;
//    [svc updateChildBounds];

    // ****************************************************************************************************
    // Prepare 2 Calendar controllers and add them to SwapViewController for TAB 2
    // ****************************************************************************************************
    
    // Create PREGNANCY Calendar ViewConroller, prepare for first screen
   /* NSLog(@"*** MainTabBarController -> viewDidLoad -> Building Pregnancy CalendarViewController");
    vcCalendarPreg = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                      instantiateViewControllerWithIdentifier:@"CalendarVC"];
    vcCalendarPreg.screenFunction = CalendarFunctionsPreg;
    // Create NEW BABY Calendar ViewConroller, prepare for first screen
    NSLog(@"*** MainTabBarController -> viewDidLoad -> Building New Baby CalendarViewController");
    vcCalendarBaby = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                      instantiateViewControllerWithIdentifier:@"CalendarVC"];
    vcCalendarBaby.screenFunction = CalendarFunctionsBaby;
    // Locate instance of SwapViewController to load its Preg/Baby View Controllers
    SwapViewController *svc2 = [[[self.viewControllers objectAtIndex:1] viewControllers] objectAtIndex:0];
    svc2.vc1 = vcCalendarPreg;
    [svc2 addChildViewController:vcCalendarPreg];
//    [svc2.vc1.view addSubview:vcCalendarPreg.view];
    svc2.vc2 = vcCalendarBaby;
    [svc2 addChildViewController:vcCalendarBaby];
//    [svc2.vc2.view addSubview:vcCalendarBaby.view];
    [svc2 updateChildBounds];
*/
    // ****************************************************************************************************
    // Prepare 2 Topics controllers and add them to SwapViewController for TAB 3
    // ****************************************************************************************************

    // Create PREGNANCY Topics ViewConroller, prepare for first screen
    NSLog(@"*** MainTabBarController -> viewDidLoad -> Building Pregnancy TopicsViewController");
    vcTopicsPreg = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                      instantiateViewControllerWithIdentifier:@"TopicsVC"];
    vcTopicsPreg.screenFunction = TopicsFunctionsPreg;
    // Create NEW BABY Topics ViewConroller, prepare for first screen
    NSLog(@"*** MainTabBarController -> viewDidLoad -> Building New Baby TopicsViewController");
    vcTopicsBaby = [[UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil]
                      instantiateViewControllerWithIdentifier:@"TopicsVC"];
    vcTopicsBaby.screenFunction  = TopicsFunctionsBaby;
    // Locate instance of SwapViewController to load its Preg/Baby View Controllers
    SwapViewController *svc3 = [[[self.viewControllers objectAtIndex:3] viewControllers] objectAtIndex:0];
    svc3.vc1 = vcTopicsPreg;
    [svc3 addChildViewController:vcTopicsPreg];
    svc3.vc2 = vcTopicsBaby;
    [svc3 addChildViewController:vcTopicsBaby];
    [svc3 updateChildBounds];


    // ******************************
    // Pre-render views for ALL TABS
    // ******************************
    int i=0;
    for (UINavigationController *navViewController in self.viewControllers)
    {
        NSLog(@"MainTabBarController: View for Tab %i", i);
        if (i!=3)
        [[navViewController.viewControllers objectAtIndex:0] view];
        NSLog(@"After workingon tab %i", i);
        i++;
    }
}

- (NSUInteger) getPageFromPregWeek: (NSUInteger) week
{
    NSUInteger page = (NSUInteger)self.userWeek - 4; // Week 4 is first page (0)
    if (page >= vcTimelinePreg.contentList.count)
        page = 0; // Ensure value is within range or default to first page
    NSLog(@"getPageFromPregWeek -> Week: %i to Page: %i", (int)week, (int)page);
    return page;
}
- (NSUInteger) getPageFromBabyWeek: (NSUInteger) week
{
    NSUInteger page = (NSUInteger)self.userWeek - 1; // Week 4 is first page (0)
    if (page >= vcTimelineBaby.contentList.count) page = 0; // Ensure value is within range or default to first page
    NSLog(@"getPageFromBabyWeek -> Week: %i to Page: %i", (int)week, (int)page);
    return page;
}
- (void)reset
{
    SwapViewController* svc = (SwapViewController *)vcTimelineBaby.parentViewController;
    
    NSUInteger page;
    if (self.userT4bProtocol==T4bProtocolPregnancy)
    {
        page = [self getPageFromPregWeek:self.userWeek];
        [vcTimelinePreg setPageTo: page];
    }
    if (self.userT4bProtocol==T4bProtocolNewBaby)
    {
        page = [self getPageFromBabyWeek:self.userWeek];
        [vcTimelineBaby setPageTo: page];
    }
    if (self.visibleProtocol != self.userT4bProtocol)
        [svc switchProtocol];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - TabBarController Delegate

- (BOOL)tabBarController:(UITabBarController *)tabBarController shouldSelectViewController:(UIViewController *)viewController
{
    int i=0;
    int h;
    for (UINavigationController *navViewController in self.viewControllers)
    {
        NSLog(@"MainTabBarController: View for Tab %i", i);
        h = ((UIViewController*)[navViewController.viewControllers objectAtIndex:0]).view.frame.size.height;
        NSLog(@"View (%i) height: %i", i, h);
        i++;
    }

    // If More is current tab, and More is tapped, revert any previous navigation to the More menu
    if (viewController == [self.viewControllers objectAtIndex:3])
    {
        [(UINavigationController*) viewController popToRootViewControllerAnimated:YES];
    }

    // For any other tab, discard clicks to the currently selected tab
    if (self.selectedIndex == [[self viewControllers] indexOfObject:viewController])
        return NO;

    // Update the selected tab content in case user switched between Pregnancy and New Baby
    if (viewController != [self.viewControllers objectAtIndex:4] && viewController != [self.viewControllers objectAtIndex:1] && viewController != [self.viewControllers objectAtIndex:2]) // Not for last tab
    {
        // Update UI for selected tab before displayed in case protocol has changed
        [[[(UINavigationController*) viewController viewControllers] objectAtIndex:0] updateProtocol];
    }
    return TRUE;
}
/*
- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait;
}

- (BOOL)shouldAutorotate {
    return YES;
}
*/
#pragma mark - Supporting functions

- (void)gotoMessageSettings
{
    UINavigationController *nc = (UINavigationController *) [self.viewControllers objectAtIndex:3];
    [nc popToRootViewControllerAnimated:NO]; // Force way back root of More before navigating to Message Settings
    MoreViewController *mvc = (MoreViewController *) [nc.viewControllers objectAtIndex:0];
    [mvc gotoMoreOptions:MoreFunctionAccountSettings];
    self.selectedIndex=3; // Switch tabs
}

@end
