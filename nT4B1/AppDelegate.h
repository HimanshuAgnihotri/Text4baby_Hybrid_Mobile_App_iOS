//
//  AppDelegate.h
//  nT4B1
//
//  Created by Gustavo on 5/2/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Support.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

////@property T4bProtocols visibleProtocol;    // 1=Pregnancy 2=New Baby

@property BOOL isFullScreen;
@property NSUInteger allowedOrientations;

@end
