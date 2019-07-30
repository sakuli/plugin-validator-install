const { PluginValidator } = require("./index.js");

describe("PluginValidator", () => {
    it("should provide a canUsePlugin method", () => {
        // GIVEN
        const validator = new PluginValidator();

        // WHEN

        // THEN
        expect(validator).toHaveProperty("verifyPlugin");
    });
});

describe("PluginValidator-E2E", () => {
    it.each`
    msg                     | pluginToken                                                                                                                                                                                               | userToken                                                                                                                                                                                                                                                                    | expected
    ${"Category matches"}   | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjF9.J_7FVPNJlohfodFHLkbNVtgrgAdzCljL7nDfLF2AlXbFlTaoq_31qgOXo0xuBL4XMMlU3zTQVMnpbiStE1pXig"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${false}
    ${"Category missmatch"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjJ9.9hJP6XiD5ftkkazIHikBm6SoQvJ0J7P-C_7LrP27PD_yUADKQoHOjW8fljLZT7BKHhj7wVUjpd_uOOdyVWassA"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${true}
    ${"Inclusive category"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjN9.er4Xf6YQUrrUrqFOEDjTTx-Mffda28jJdGV7t1q2_lm2fzCvVfiu8_6z0cni4ij-x6j8AHnnfnt3uq9jbOWzoA"} | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${false}
    ${"UserToken empty"}    | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjN9.6RGBOARpKuaRZJ25MoBiyS1DU25nbnEiSwIiwl7HrtwmwkixFxXx-ZuZp9AM1xkQqeEauUT8aV7TylVs2l-pqg"} | ${""}                                                                                                                                                                                                                                                                        | ${true}
    ${"PluginToken empty"}  | ${""}                                                                                                                                                                                                     | ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ"} | ${true}
  `(
        "$msg throws: $expected",
        ({ msg, pluginToken, userToken, expected }) => {
            // GIVEN
            const validator = new PluginValidator();

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
        }
    );

    it("should throw on license category missmatch", () => {
        // GIVEN
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjR9.Uir5hLbI-eUtTTA_M1JE8oAr0rDRQCg6UEDlvraaDKZbLJWvpH-Jw9arx7X99NYgJFXNcPwAPDvYurxTiyGvuw";

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
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.CrU7CXpDr62lreHFV7FtkQvXsgQ0vmNS8xYvX5sjcxaOtBIFNaiAg60GKmKP72nMmYnMuzOEIJUW5eSpAbeKYQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjEwMH0.aNMdfgpWACDB6m92NNIeqIbeD-lgbfQUoQmL5VkAguha64pvHXbMCzY-yyV077if26M8-vuLrddm_B9WUi7DfA";

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
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImV4cCI6MTU2NDA0MDg4NywiYXVkIjoia3VuZGUwODE1In0.n6Q9N1I5wI-nJFiFsnA6q7hS7nwAmx_M5FXzWxlJRbHIfI_6LaMPL_nD_OsPwK9qUQw1uwMwOFpLOn5cbwbBUg";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjEwMH0.aNMdfgpWACDB6m92NNIeqIbeD-lgbfQUoQmL5VkAguha64pvHXbMCzY-yyV077if26M8-vuLrddm_B9WUi7DfA";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("token expired");
    });

    it("should throw due to immature token", () => {
        // GIVEN
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE3MjIwODcyMzMsImV4cCI6MTcyMjA4NzIzMywiYXVkIjoia3VuZGUwODE1In0.iVBPCFA3yT-BhKzVb469zEMsM170tqC-tE8u-0A25ojZc9dS7RIgACc_XwbQUuLpyEBdoLSqIqOIWJ6Fp_nlaA";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjEwMH0.aNMdfgpWACDB6m92NNIeqIbeD-lgbfQUoQmL5VkAguha64pvHXbMCzY-yyV077if26M8-vuLrddm_B9WUi7DfA";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("immature signature");
    });

    it("should throw due to missing 'exp' timestamp", () => {
        // GIVEN
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJuYmYiOjE1NjQwNDA4ODcsImF1ZCI6Imt1bmRlMDgxNSJ9.bHDmBgpQdzxseqNsLGnxh0CEVnXMUjfNH1Evg5_egywxQYF7GWpta_w7_QH1bKVBqRo5O6kCXwOPgImxRS7fNQ";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjEwMH0.aNMdfgpWACDB6m92NNIeqIbeD-lgbfQUoQmL5VkAguha64pvHXbMCzY-yyV077if26M8-vuLrddm_B9WUi7DfA";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("Missing 'exp' timestamp");
    });

    it("should throw due to missing 'nbf' timestamp", () => {
        // GIVEN
        const validator = new PluginValidator();
        const userToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfdXNlciIsImNhdGVnb3J5IjoxLCJleHAiOjE3MjIwODcyMzMsImF1ZCI6Imt1bmRlMDgxNSJ9.Ic3N5c30Bd8a8jlQ8j1sSUaTW635ifuHGCVM6OSUQ_1EiG18EG9o-q3Oc9acyDQUyg5nbdtDXVmYFI-Irj-snA";
        const pluginToken =
            "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzYWt1bGkuaW8iLCJzdWIiOiJzYWt1bGlfcGx1Z2luIiwiY2F0ZWdvcnkiOjEwMH0.aNMdfgpWACDB6m92NNIeqIbeD-lgbfQUoQmL5VkAguha64pvHXbMCzY-yyV077if26M8-vuLrddm_B9WUi7DfA";

        // WHEN

        // THEN
        expect(() =>
            validator.verifyPlugin({ pluginToken }, userToken)
        ).toThrowError("Missing 'nbf' timestamp");
    });
});
