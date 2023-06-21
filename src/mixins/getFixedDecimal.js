import { Decimal } from "decimal.js";

export default {
  methods: {
    getFixedDecimal(val, precision = 8, toClosest = false) {
      let res = val
        ? new Decimal(
            new Decimal(val).toFixed(
              precision,
              toClosest ? Decimal.ROUND_HALF_FLOOR : Decimal.ROUND_DOWN
            )
          ).toNumber()
        : 0;
      return val > 0 && res === 0 ? val : res;
    },
  },
};
