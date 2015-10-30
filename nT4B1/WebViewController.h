//
//  WebViewController.h
//  nT4B2
//
//  Created by Gustavo on 8/21/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WeekSelectionProtocol.h"
#import "BrowserSwipeViewController.h"

@interface WebViewController : UIViewController <UIWebViewDelegate>

//@property (nonatomic, weak) IBOutlet UILabel *pageNumberLabel;
@property (nonatomic, weak) IBOutlet UIWebView *theWebView;
@property (nonatomic, weak) NSString *pageTitle;
@property (nonatomic, weak) BrowserSwipeViewController *parentController;
@property BOOL completedLoading;
@property NSUInteger week;

//- (id)initWithPageNumber:(NSString*)pageHTML;
- (id)initWithPage:(NSString*)page Location:(NSString*)location;

@end
