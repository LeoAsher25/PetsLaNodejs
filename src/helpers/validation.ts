import mongoose from "mongoose";

const ValidatorHelper = {
  email: /^[\w\.]+@([\w]+\.)+[\w]{2,7}$/,
  password: /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  phone: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
  objectId: (id: string) => {
    // if (mongoose.Types.ObjectId.isValid(id)) {
    //   if (String(new mongoose.Types.ObjectId(id)) === id) return true;
    //   return false;
    // }
    // return false;
    return (
      mongoose.Types.ObjectId.isValid(id) &&
      String(new mongoose.Types.ObjectId(id)) === id
    );
  },
};
export default ValidatorHelper;
