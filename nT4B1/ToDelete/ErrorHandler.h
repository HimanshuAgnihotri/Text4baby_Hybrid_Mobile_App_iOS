//
//  ErrorHandler.h
//  nT4B2b
//
//  Created by Gustavo on 11/6/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ErrorHandler : NSObject <UIAlertViewDelegate>

enum {
    ErrorActionNone = 0,
    ErrorActionDismissCurrentWindow = 1,
    ErrorActionGoToMessageSettings = 2,
};
typedef NSUInteger ErrorActions;


@property (nonatomic,strong) NSString *ErrorMsg;
@property (nonatomic,strong) NSString *ErrorPath;

//-(id)initWithError:(NSString *)errorMsg forPath:(NSString *)errorPath;

-(ErrorActions)evaluateError:(NSString *)errorMsg forPath:(NSString *)errorPath;

@end
