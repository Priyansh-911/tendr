const BASE_URL = "http://localhost:8080";

export const signupVendorOtp = async (phoneNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/vsignup/otp `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
      credentials: "include",
    });

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON, but received: ${text.substring(0, 100)}...`);
    }

    const result = await response.json();
    if (!response.ok) {
      if (result.errors) {
        throw new Error(JSON.stringify(result.errors));
      }
      throw new Error(result.message || "Failed to send OTP");
    }
    return result;
  } catch (error) {
    console.error("Vendor Signup OTP Error:", error);
    throw error;
  }
};

export const verifyVendorOtp = async ({ phoneNumber, otp }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/vsignup/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, otp }),
      credentials: "include",
    });

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON, but received: ${text.substring(0, 100)}...`);
    }

    const result = await response.json();
    if (!response.ok) {
      if (result.errors) {
        throw new Error(JSON.stringify(result.errors));
      }
      throw new Error(result.message || "OTP verification failed");
    }
    return result;
  } catch (error) {
    console.error("Vendor OTP Verification Error:", error);
    throw error;
  }
};

export const completeVendorSignup = async (vendorData) => {
  try {
    const formData = new FormData();
    formData.append("phoneNumber", vendorData.phoneNumber);
    formData.append("secondaryPhoneNumber", vendorData.secondaryPhoneNumber || "");
    formData.append("name", vendorData.name);
    formData.append("gstNumber", vendorData.gstNumber);
    formData.append("teamSize", vendorData.teamSize);
    formData.append("locations", JSON.stringify([vendorData.location]));
    formData.append("serviceType", vendorData.service === "others" ? vendorData.customService : vendorData.service);
    formData.append(
      "address",
      JSON.stringify({
        street: vendorData.address,
        city: vendorData.location,
        state: vendorData.state,
      })
    );
    formData.append("yearsofExperience", vendorData.experience || "0"); // Default to 0 if not provided
    formData.append("panNumber", vendorData.governmentId);
    formData.append("aadhaarNumber", vendorData.aadhaarNumber);
    formData.append("password", vendorData.password);
    if (vendorData.portfolioFiles) {
      vendorData.portfolioFiles.forEach((file) => formData.append("portfolioFiles", file));
    }

    const response = await fetch(`${BASE_URL}/auth/vsignup`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON, but received: ${text.substring(0, 100)}...`);
    }

    const result = await response.json();
    if (!response.ok) {
      if (result.errors) {
        throw new Error(JSON.stringify(result.errors));
      }
      throw new Error(result.message || "Vendor signup failed");
    }
    return result;
  } catch (error) {
    console.error("Complete Vendor Signup Error:", error);
    throw error;
  }
};