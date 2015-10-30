//
//  CalendarViewController.h
//  nT4B2b
//
//  Created by Gustavo on 11/6/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SwapViewProtocol.h"

@interface CalendarViewController : UIViewController <UIWebViewDelegate, SwapViewProtocol, UIAlertViewDelegate>

enum {
    CalendarFunctionsNone = 0,
    CalendarFunctionsPreg = 1,
    CalendarFunctionsBaby = 2,
    CalendarFunctionsAppointmentPreg = 3,
    CalendarFunctionsAppointmentBaby = 4,
    CalendarFunctionsSetAppointmentPreg = 5,
    CalendarFunctionsSetAppointmentBaby = 6,
    CalendarFunctionsChecklistPreg = 7,
    CalendarFunctionsChecklistBaby = 8,
    CalendarFunctionsChecklistAddItemPreg = 9,
    CalendarFunctionsChecklistAddItemBaby = 10,
};
typedef NSUInteger CalendarFunctions;

@property (strong, nonatomic) IBOutlet UIWebView *theWebView;

@property CalendarFunctions screenFunction;
@property NSString *queryParameters;

- (void) viewRefresh;
@end
