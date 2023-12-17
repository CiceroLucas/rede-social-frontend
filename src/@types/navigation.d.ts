declare module "@react-navigation/native"
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined;
      Home: undefined;
      registro: undefined;
      Profile: undefined;
      editprofile: undefined;
      CreatePublish: { photo: CameraCapturedPicture | undefined };
      OtherProfile: { userId: string }; 
    }
  }
}
