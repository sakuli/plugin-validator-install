const { PluginValidator } = require("./index.js");

describe("PluginValidator", () => {
    it("should also be no-arg constructable", () => {
        // GIVEN

        // WHEN

        // THEN
        expect(() => new PluginValidator()).not.toThrow();
    });

    it("should provide a canUsePlugin method", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/testpackage");

        // WHEN

        // THEN
        expect(validator).toHaveProperty("verifyPlugin");
    });
});

describe("PluginValidator-E2E", () => {
    it.each`
    msg                     | pluginToken                                                                                                                                                                                                                                     | userToken                                                                                                                                                                                                                                                                    | expected
    ${"Category matches"}   | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxfQ.RftqaToo4xPb-pmNL52nFqOKynWML3rLyaeAlEKvSVIYv1hmx20TbkXzlntO1jOHvIDhwZLOjNYGI2UNIANl1Q"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${false}
    ${"Category missmatch"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoyfQ.sTba90drmg2MkVi5oqSKmDf8IdSxA3VUEyTiLcxW455dFt6b0GmXfv-jSzMX5hD5iFThYjrcnE5KzO_RdmbIjw"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${true}
    ${"Inclusive category"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjozfQ.lO1qiOp51KlaZm_pX-NW-0D4h5IiMKBfv6208BORO0qe7HEsSMO9I74WJNrG4i6ksvISCU2EFLEFdE-xd6oVvA"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${false}
    ${"UserToken empty"}    | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxfQ.RftqaToo4xPb-pmNL52nFqOKynWML3rLyaeAlEKvSVIYv1hmx20TbkXzlntO1jOHvIDhwZLOjNYGI2UNIANl1Q"} | ${""}                                                                                                                                                                                                                                                                        | ${true}
    ${"PluginToken empty"}  | ${""}                                                                                                                                                                                                                                           | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${true}
  `("$msg throws: $expected", ({ msg, pluginToken, userToken, expected }) => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");

        // WHEN

        // THEN
        if (!expected) {
            expect(() =>
                validator.verifyPlugin({ pluginToken }, userToken)
            ).not.toThrow();
        } else {
            expect(() =>
                validator.verifyPlugin({ pluginToken }, userToken)
            ).toThrow();
        }
    });

    it("should throw on missing plugin audience", () => {
        // GIVEN
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5Ijo0fQ.xGJTG1IXwKNIV1GaKmer9D8SqMYAsMz72q54zd4LMPJ2nly_NAb_lkCa9Z0bUVDe9YeEXBcROVMcyQPzbHRgMw";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError(
            "Plugin UNKNOWN_PACKAGE provided invalid token: @sakuli/test_plugin"
        );
    });

    it("should throw on invalid plugin audience", () => {
        // GIVEN
        const packageName = "@sakuli/wrong_package"
        const validator = new PluginValidator(packageName);
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5Ijo0fQ.xGJTG1IXwKNIV1GaKmer9D8SqMYAsMz72q54zd4LMPJ2nly_NAb_lkCa9Z0bUVDe9YeEXBcROVMcyQPzbHRgMw";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError(
            `Plugin ${packageName} provided invalid token: @sakuli/test_plugin`
        );
    });

    it("should throw on license category missmatch", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5Ijo0fQ.xGJTG1IXwKNIV1GaKmer9D8SqMYAsMz72q54zd4LMPJ2nly_NAb_lkCa9Z0bUVDe9YeEXBcROVMcyQPzbHRgMw";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError(
            "Token missmatch. userToken category 1 does not match pluginToken category 4"
        );
    });

    it("should throw due to invalid license category", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxMDB9.7y7DdYBcH458m6NDDbNRE9BNnIESiUsTvioYA32IL8CrAJOSooOTcLxr8y3BdbgOxxId12BRhVRh52ivPFkQ4A";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("Invalid token category: 100");
    });
});

describe("Timestamps", () => {
    it("should throw due to expired token", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTU2NDA0MDg4NywiYXVkIjoia3VuZGUwODE1In0.n6Q9N1I5wI-nJFiFsnA6q7hS7nwAmx_M5FXzWxlJRbHIfI_6LaMPL_nD_OsPwK9qUQw1uwMwOFpLOn5cbwbBUg";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxMDB9.7y7DdYBcH458m6NDDbNRE9BNnIESiUsTvioYA32IL8CrAJOSooOTcLxr8y3BdbgOxxId12BRhVRh52ivPFkQ4A";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("token expired");
    });

    it("should throw due to immature token", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE3MjIwODcyMzMsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.iVBPCFA3yT-BhKzVb469zEMsM170tqC-tE8u-0A25ojZc9dS7RIgACc_XwbQUuLpyEBdoLSqIqOIWJ6Fp_nlaA";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxMDB9.7y7DdYBcH458m6NDDbNRE9BNnIESiUsTvioYA32IL8CrAJOSooOTcLxr8y3BdbgOxxId12BRhVRh52ivPFkQ4A";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("immature signature");
    });

    it("should throw due to missing 'exp' timestamp", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImF1ZCI6Imt1bmRlMDgxNSJ9.bHDmBgpQdzxseqNsLGnxh0CEVnXMUjfNH1Evg5_egywxQYF7GWpta_w7_QH1bKVBqRo5O6kCXwOPgImxRS7fNQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxMDB9.7y7DdYBcH458m6NDDbNRE9BNnIESiUsTvioYA32IL8CrAJOSooOTcLxr8y3BdbgOxxId12BRhVRh52ivPFkQ4A";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("Missing 'exp' timestamp");
    });

    it("should throw due to missing 'nbf' timestamp", () => {
        // GIVEN
        const validator = new PluginValidator("@sakuli/test_plugin");
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJleHAiOjE3MjIwODcyMzMsImF1ZCI6Imt1bmRlMDgxNSJ9.Ic3N5c30Bd8a8jlQ8j1sSUaTW635ifuHGCVM6OSUQ_1EiG18EG9o-q3Oc9acyDQUyg5nbdtDXVmYFI-Irj-snA";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiYXVkIjoiQHNha3VsaS90ZXN0X3BsdWdpbiIsImNhdGVnb3J5IjoxMDB9.7y7DdYBcH458m6NDDbNRE9BNnIESiUsTvioYA32IL8CrAJOSooOTcLxr8y3BdbgOxxId12BRhVRh52ivPFkQ4A";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("Missing 'nbf' timestamp");
    });
});
