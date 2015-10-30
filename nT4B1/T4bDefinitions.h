//
//  T4bDefinitions.h
//  nT4B2b
//
//  Created by Gustavo on 12/13/14.
//  Copyright (c) 2014 Gustavo. All rights reserved.
//

#ifndef nT4B2b_T4bDefinitions_h
#define nT4B2b_T4bDefinitions_h

enum {
    T4bProtocolPregnancy = 1,
    T4bProtocolNewBaby = 2,
};
typedef NSUInteger T4bProtocols;

enum {
    SignInFunctionsNone = 0,
    SignInFunctionSplash = 1,
    SignInFunctionSignIn = 2,
    SignInFunctionForgotPassword = 3,
    SignInFunctionChangePassword = 4,
    SignInFunctionResetPassword = 5,
};
typedef NSUInteger SignInFunctions;

enum {
    SignUpFunctionsNone = 0,
    SignUpFunctionSignUp = 1,
    SignUpFunctionSignUpTellUs = 2,
    SignUpFunctionSignUpFinish = 3,
    SignUpFunctionSignUpLink = 4,
    SignUpFunctionSignUpCode = 5,
    SignUpFunctionSignUpCarriers = 6,
    SignUpFunctionSignUpTerms = 7,
    SignUpFunctionSignUpPolicy = 8,
};
typedef NSUInteger SignUpFunctions;


enum {
    errorAlertNone = 0,
    errorAlertMoreClearData = 1,
    errorAlertMoreMessageSetting = 2,
    errorAlertMoreMessageSetting_OffToOn = 3,
    errorAlertAppNeedsUpdate = 4,
    errorAlertCalendarMessageSettings = 5,
};
typedef NSUInteger errorAlertType;



#endif
