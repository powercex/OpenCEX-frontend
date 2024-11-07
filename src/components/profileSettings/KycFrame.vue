<template>
  <div id="persona"></div>
</template>

<script>
export default {
  name: "KycFrame",
  props: {
    isWizard: {
      type: Boolean,
    },
  },
  data() {
    return {
      kyctoken: "",
      kycuser: "",
    };
  },
  methods: {
    renderKYC(aToken) {
      if (!document.querySelector("#persona")) return;

      /* eslint-disable */
      const self = this;
      const client = new Persona.Client(
          {
            templateId: "itmpl_7mRzhf9SnfTowMr1EDF3juPN",
            referenceId: aToken,
            environmentId: "env_ainVvNXJyHgaF3daHC9ycYGN",
            onReady: () => client.open(),
	    onComplete: ({ inquiryId, status, fields }) => {
            // Inquiry completed. Optionally tell your server about it.
	         console.log(`Sending finished inquiry ${inquiryId} to backend`);
		 self.$http.post("kyc_callback/", {token: aToken, inquiryId: inquiryId, status: status, fields: fields}).then(res => { console.log('done callback')})
            },
            onCancel: ({ inquiryId, sessionToken }) => { 
	         console.log('onCancel') 
		 self.$http.post("kyc_callback/", {token: aToken, inquiryId:inquiryId, status:'cancel'}).then(res => { console.log('done callback')})
	    },
	    onError: (error) => console.log(error),
          }
      );
    }
  },
  mounted() {
    this.$http
        .post(
            "kyc_get_access_token/?source=wizard"
        )
        .then(
            response => {
              this.kyctoken = response.data["token"];
              this.kycuser = response.data["userId"];
              this.renderKYC(response.data["token"], response.data["userId"]);
            }
        );
  }
};
</script>
