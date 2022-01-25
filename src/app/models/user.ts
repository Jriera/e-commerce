export interface User {
    uid: string|undefined|null;
    email: string|null|undefined;
    photoURL?: string | null|undefined;
    displayName?: string | null|undefined;
    myCustomData?: string;
    admin?: boolean;
    isAnonymous?: boolean | null;
    phoneNumber?: string | null;
  }