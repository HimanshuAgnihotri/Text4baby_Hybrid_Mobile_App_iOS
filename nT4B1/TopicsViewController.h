//
//  TimelineViewController.h
//  nT4B1
//
//  Created by Gustavo on 5/18/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SwapViewProtocol.h"


@interface TopicsViewController : UIViewController <UIWebViewDelegate, SwapViewProtocol>

enum {
    TopicsFunctionsNone = 0,
    TopicsFunctionsPreg = 1,
    TopicsFunctionsBaby = 2,
};
typedef NSUInteger TopicsFunctions;

@property (strong, nonatomic) IBOutlet UIWebView *theWebView;

@property TopicsFunctions screenFunction;

@end
