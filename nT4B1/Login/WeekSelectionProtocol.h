//
//  WeekSelectionProtocol.h
//  nT4B2b - Text4baby App
//
//  Protocol containing function to be called when a week selection is made
//
//  Created by Gustavo on 11/2/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

@protocol WeekSelectionDelegate <NSObject>

- (void) updateWeekSelection:(NSUInteger) selectedWeekIndex;
- (void) gotoHomeWeek;

@end


