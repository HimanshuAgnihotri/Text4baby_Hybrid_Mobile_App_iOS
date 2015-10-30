//
//  SwapViewController.m
//  nT4B2
//
//  Created by Gustavo on 8/31/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "SwapViewController.h"
#import "MainTabBarController.h"

@interface SwapViewController ()

@end


@implementation SwapViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void) refreshCurrentView;
{
////    if (appdelegate.visibleProtocol == 1)
    MainTabBarController *tb = (MainTabBarController *) self.tabBarController;
    if ( tb.visibleProtocol == 1)
        [self.vc1 viewRefresh];
    else
        [self.vc2 viewRefresh];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSLog(@"SwapViewController viewDidLoad");

    // Do any additional setup after loading the view.

//    self.view.backgroundColor = [UIColor colorWithRed:1 green:0 blue:0 alpha:1   ];

/*
    [self.view1 addSubview: self.vc1.view];
    [self addChildViewController:self.vc1];
    [self.view2 addSubview: self.vc2.view];
    [self addChildViewController:self.vc2];
*/
    [self.view addSubview: self.vc1.view];
    self.view1 = self.vc1.view;
    [self addChildViewController:self.vc1];
    [self.view addSubview: self.vc2.view];
    self.view2 = self.vc2.view;
    [self addChildViewController:self.vc2];
    
//    [self updateChildBounds];

    [self updateProtocol];

    UIBarButtonItem *backButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"" style:UIBarButtonItemStylePlain target:nil action:nil];
    [self.navigationItem setBackBarButtonItem:backButtonItem];
}

- (void)updateChildBounds
{
    NSLog(@"updateChildBounds BEFORE");
    NSLog(@"** HEIGHT parentViewController: %f", self.parentViewController.view.frame.size.height);
    NSLog(@"** HEIGHT swap: %f", self.view.frame.size.height);
    NSLog(@"** HEIGHT swap view1: %f", self.view1.frame.size.height);
    NSLog(@"** HEIGHT swap view2: %f", self.view2.frame.size.height);
    
    NSLog(@"** HEIGHT swap vc1.view: %f", self.vc1.view.frame.size.height);
    NSLog(@"** HEIGHT swap vc2.view: %f", self.vc2.view.frame.size.height);

    self.view.frame = self.parentViewController.view.frame;
    self.view1.frame = self.view.bounds;
    self.view2.frame = self.view.bounds;
    self.vc1.view.frame = self.view1.bounds; // Put the BrowserSwipeVC within the swapable view controller view
    self.vc2.view.frame = self.view2.bounds; // Put the BrowserSwipeVC within the swapable view controller view

    NSLog(@"updateChildBounds AFTER");
    NSLog(@"** HEIGHT parentViewController: %f", self.parentViewController.view.frame.size.height);
    NSLog(@"** HEIGHT swap: %f", self.view.frame.size.height);
    NSLog(@"** HEIGHT swap view1: %f", self.view1.frame.size.height);
    NSLog(@"** HEIGHT swap view2: %f", self.view2.frame.size.height);

    NSLog(@"** HEIGHT swap vc1.view: %f", self.vc1.view.frame.size.height);
    NSLog(@"** HEIGHT swap vc2.view: %f", self.vc2.view.frame.size.height);

}


//*****************************************************************************************************************
//* Switch UIViewControllers between Pregnancy and New Baby based on global state (at UITabBar level)
//* Animate the transition
//*****************************************************************************************************************
- (void)updateProtocol
{
    // *** Previous swap idea
    // [self.theWebView setHidden:TRUE];
    // [self.theWebView2 setHidden:FALSE];
    
    // *** Previous animation idea
    // [UIView beginAnimations:@"ToggleViews" context:nil];
    // [UIView setAnimationDuration:1.0];
    // Make the animatable changes.
    // self.theWebView.alpha =1.0;
    // self.theWebView2.alpha = 0.0;
    // [self.btnBaby setTitle:@"Pregnancy"];
    // Commit the changes and perform the animation.
    // [UIView commitAnimations];
    
    UIViewAnimationOptions aniType = UIViewAnimationOptionShowHideTransitionViews;
    [self view];
    [self.vc1 view];
    [self.vc2 view];
    MainTabBarController *tb = (MainTabBarController *) self.tabBarController;
////    if (appdelegate.visibleProtocol==1) // On Pregnancy ?
    if (tb.visibleProtocol==1) // On Pregnancy ?
    {
        aniType += UIViewAnimationOptionTransitionCurlDown;
//        [self.btnBaby setTitle:@"Baby"]; // Change button to Baby
        [self.btnBaby setImage:[UIImage imageNamed: @"switch-newbaby"]];
        
        [UIView transitionFromView: self.view2
                            toView: self.view1
                          duration:1.0 options: aniType  completion: nil ];
    }
    else
    {
        aniType += UIViewAnimationOptionTransitionCurlUp;
        [self.btnBaby setImage:[UIImage imageNamed: @"switch-pregnancy"]];

        [UIView transitionFromView: self.view1
                            toView: self.view2
                          duration:1.0 options: aniType  completion: nil ];
    }
}

- (IBAction)doBabyButton;
{
    [self switchProtocol];
}

- (void)switchProtocol
{
    MainTabBarController *tb = (MainTabBarController *) self.tabBarController;

////    NSLog(@"t4bprotocol: %i", (int) ((AppDelegate *)[UIApplication sharedApplication].delegate).visibleProtocol);
    NSLog(@"t4bprotocol: %i", (int)tb.visibleProtocol);
    
    if (tb.visibleProtocol == T4bProtocolPregnancy) // Pregnancy ?
    {
        tb.visibleProtocol = T4bProtocolNewBaby;
        NSLog(@"Switch from Pregnancy to Baby");
        [self.vc2 switchEvent:tb.visibleProtocol]; // Let active viewcontroller know it will be displayed
    }
    else
    {
        tb.visibleProtocol = T4bProtocolPregnancy;
        [self.vc1 switchEvent:tb.visibleProtocol]; // Let active viewcontroller know it will be displayed
        NSLog(@"Switch from Baby to Pregnancy");
    }
    [self updateProtocol]; // Update UI
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
@end
