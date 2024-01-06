import moment from "moment";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "@/convex/_generated/dataModel";
import querystring from "qs";
import crypto from "crypto";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export const createVNPay = async (userId: Id<"user">) => {
  const order = await convex.mutation(api.order.create, {
    userId,
    isPay: false,
  });
  process.env.TZ = "Asia/Ho_Chi_Minh";
  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");
  let tmnCode = process.env.NEXT_PUBLIC_VNP_TMNCODE;
  let secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECRET!;
  let vnpUrl = process.env.NEXT_PUBLIC_VNP_URL;
  let returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment`;
  let vnp_Params: any = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = order;
  vnp_Params["vnp_OrderInfo"] =
    "Thanh toán cho HeartSteal Professor 10.000 VND";
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = 1000000;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = "127.0.0.1";
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params = sortObject(vnp_Params);
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  return vnpUrl;
};

function sortObject(obj: any) {
  let sorted: any = {};
  let str = [];
  let key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
