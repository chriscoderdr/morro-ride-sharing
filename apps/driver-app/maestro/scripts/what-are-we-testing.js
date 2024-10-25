const expoApp = "host.exp.Exponent";
const nativeApp = "com.chriscoder.driverapp";

var appIdUnderTest = nativeApp;

if (testEnv == "expo") {
  appIdUnderTest = expoApp;
}

output.appIdUnderTest = appIdUnderTest;
