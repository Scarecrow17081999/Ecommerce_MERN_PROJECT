import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import "./Shipping.css";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import Metadata from "../layout/Metadata";

import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [address, setAddress] = useState(shippingInfo.address);
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.county);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      console.log("phone number should be equals to 10 digits");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        pincode,
        country,
        state,
        phoneNo,
        email: user?.user?.email,
      })
    );

    navigate("/order/confirm");
  };
  return (
    <>
      <Metadata title="Shipping--Details" />
      <CheckoutSteps activeSteps={0} />
      <div className="shippingContainer">
        <div className="shippingBoc">
          <h2 className="shippingHeading"> Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="text"
                placeholder="Pin code"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <PhoneAndroidIcon />
              <input
                type="text"
                placeholder="Phone No"
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
                required
                maxLength={10}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>

                {Country &&
                  Country.getAllCountries().map((item, i) => (
                    <option key={i} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item, i) => (
                      <option key={i} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value={"Continue"}
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
