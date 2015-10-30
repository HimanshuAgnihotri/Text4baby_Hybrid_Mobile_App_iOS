//
//  WelcomeViewController.h
//  nT4B2b
//
//  Created by Gustavo on 11/15/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface WelcomeViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIView *viewMsg;
@property (weak, nonatomic) IBOutlet UIButton *btnOk;
- (IBAction)doOk;

@end
