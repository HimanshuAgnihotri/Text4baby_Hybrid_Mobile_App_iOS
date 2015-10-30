//
//  SwapViewProtocol.h
//  nT4B2b
//
//  Created by Gustavo on 11/16/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#import "T4bDefinitions.h"

@protocol SwapViewProtocol <NSObject>

@required
- (void) viewRefresh;
- (void) switchEvent: (T4bProtocols) newProtocol;

@end
