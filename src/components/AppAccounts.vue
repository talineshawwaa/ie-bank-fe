<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Alert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{
            message
          }}</b-alert>

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
          >
            Create Account
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Balance</th>
                <th scope="col">Account Currency</th>
                <th scope="col">Account Country</th> <!-- Added country -->
                <th scope="col">Account Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.currency }}</td>
                <td>{{ account.country }}</td> <!-- Display country -->
                <td>
                  <span
                    v-if="account.status == 'Active'"
                    class="badge badge-success"
                    >{{ account.status }}</span
                  >
                  <span v-else class="badge badge-danger">{{
                    account.status
                  }}</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-account-modal
                      @click="editAccount(account)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteAccount(account)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
      <b-modal
        ref="addAccountModal"
        id="account-modal"
        title="Create a new account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
            id="form-name-group"
            label="Account Name:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createAccountForm.name"
              placeholder="Account Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="form-currency-group"
            label="Currency:"
            label-for="form-currency-input"
          >
            <b-form-input
              id="form-currency-input"
              type="text"
              v-model="createAccountForm.currency"
              placeholder="$ or €"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="form-country-group"
            label="Country:"
            label-for="form-country-input"
          >
            <b-form-select
              id="form-country-input"
              v-model="createAccountForm.country"
              :options="countries"
              required
            ></b-form-select>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Account-->
      <!-- Start of Modal for Edit Account-->
      <b-modal
        ref="editAccountModal"
        id="edit-account-modal"
        title="Edit the account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-edit-name-group"
            label="Account Name:"
            label-for="form-edit-name-input"
          >
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editAccountForm.name"
              placeholder="Account Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit Account-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      createAccountForm: {
        name: "",
        currency: "",
        country: "", // Added country
      },
      editAccountForm: {
        id: "",
        name: "",
      },
      showMessage: false,
      message: "",
      countries: [ // Added countries dropdown options
        { value: null, text: 'Select a country' },
        { value: 'AF', text: 'Afghanistan' },
        { value: 'AL', text: 'Albania' },
        { value: 'DZ', text: 'Algeria' },
        { value: 'AS', text: 'American Samoa' },
        { value: 'AD', text: 'Andorra' },
        { value: 'AO', text: 'Angola' },
        { value: 'AI', text: 'Anguilla' },
        { value: 'AQ', text: 'Antarctica' },
        { value: 'AG', text: 'Antigua and Barbuda' },
        { value: 'AR', text: 'Argentina' },
        { value: 'AM', text: 'Armenia' },
        { value: 'AW', text: 'Aruba' },
        { value: 'AU', text: 'Australia' },
        { value: 'AT', text: 'Austria' },
        { value: 'AZ', text: 'Azerbaijan' },
        { value: 'BS', text: 'Bahamas' },
        { value: 'BH', text: 'Bahrain' },
        { value: 'BD', text: 'Bangladesh' },
        { value: 'BB', text: 'Barbados' },
        { value: 'BY', text: 'Belarus' },
        { value: 'BE', text: 'Belgium' },
        { value: 'BZ', text: 'Belize' },
        { value: 'BJ', text: 'Benin' },
        { value: 'BM', text: 'Bermuda' },
        { value: 'BT', text: 'Bhutan' },
        { value: 'BO', text: 'Bolivia' },
        { value: 'BQ', text: 'Bonaire, Sint Eustatius and Saba' },
        { value: 'BA', text: 'Bosnia and Herzegovina' },
        { value: 'BW', text: 'Botswana' },
        { value: 'BV', text: 'Bouvet Island' },
        { value: 'BR', text: 'Brazil' },
        { value: 'IO', text: 'British Indian Ocean Territory' },
        { value: 'BN', text: 'Brunei Darussalam' },
        { value: 'BG', text: 'Bulgaria' },
        { value: 'BF', text: 'Burkina Faso' },
        { value: 'BI', text: 'Burundi' },
        { value: 'CV', text: 'Cabo Verde' },
        { value: 'KH', text: 'Cambodia' },
        { value: 'CM', text: 'Cameroon' },
        { value: 'CA', text: 'Canada' },
        { value: 'KY', text: 'Cayman Islands' },
        { value: 'CF', text: 'Central African Republic' },
        { value: 'TD', text: 'Chad' },
        { value: 'CL', text: 'Chile' },
        { value: 'CN', text: 'China' },
        { value: 'CX', text: 'Christmas Island' },
        { value: 'CC', text: 'Cocos (Keeling) Islands' },
        { value: 'CO', text: 'Colombia' },
        { value: 'KM', text: 'Comoros' },
        { value: 'CG', text: 'Congo' },
        { value: 'CD', text: 'Congo, Democratic Republic of the' },
        { value: 'CK', text: 'Cook Islands' },
        { value: 'CR', text: 'Costa Rica' },
        { value: 'HR', text: 'Croatia' },
        { value: 'CU', text: 'Cuba' },
        { value: 'CW', text: 'Curaçao' },
        { value: 'CY', text: 'Cyprus' },
        { value: 'CZ', text: 'Czech Republic' },
        { value: 'DK', text: 'Denmark' },
        { value: 'DJ', text: 'Djibouti' },
        { value: 'DM', text: 'Dominica' },
        { value: 'DO', text: 'Dominican Republic' },
        { value: 'EC', text: 'Ecuador' },
        { value: 'EG', text: 'Egypt' },
        { value: 'SV', text: 'El Salvador' },
        { value: 'GQ', text: 'Equatorial Guinea' },
        { value: 'ER', text: 'Eritrea' },
        { value: 'EE', text: 'Estonia' },
        { value: 'SZ', text: 'Eswatini' },
        { value: 'ET', text: 'Ethiopia' },
        { value: 'FK', text: 'Falkland Islands (Malvinas)' },
        { value: 'FO', text: 'Faroe Islands' },
        { value: 'FJ', text: 'Fiji' },
        { value: 'FI', text: 'Finland' },
        { value: 'FR', text: 'France' },
        { value: 'GF', text: 'French Guiana' },
        { value: 'PF', text: 'French Polynesia' },
        { value: 'TF', text: 'French Southern Territories' },
        { value: 'GA', text: 'Gabon' },
        { value: 'GM', text: 'Gambia' },
        { value: 'GE', text: 'Georgia' },
        { value: 'DE', text: 'Germany' },
        { value: 'GH', text: 'Ghana' },
        { value: 'GI', text: 'Gibraltar' },
        { value: 'GR', text: 'Greece' },
        { value: 'GL', text: 'Greenland' },
        { value: 'GD', text: 'Grenada' },
        { value: 'GP', text: 'Guadeloupe' },
        { value: 'GU', text: 'Guam' },
        { value: 'GT', text: 'Guatemala' },
        { value: 'GG', text: 'Guernsey' },
        { value: 'GN', text: 'Guinea' },
        { value: 'GW', text: 'Guinea-Bissau' },
        { value: 'GY', text: 'Guyana' },
        { value: 'HT', text: 'Haiti' },
        { value: 'HM', text: 'Heard Island and McDonald Islands' },
        { value: 'VA', text: 'Holy See' },
        { value: 'HN', text: 'Honduras' },
        { value: 'HK', text: 'Hong Kong' },
        { value: 'HU', text: 'Hungary' },
        { value: 'IS', text: 'Iceland' },
        { value: 'IN', text: 'India' },
        { value: 'ID', text: 'Indonesia' },
        { value: 'IR', text: 'Iran' },
        { value: 'IQ', text: 'Iraq' },
        { value: 'IE', text: 'Ireland' },
        { value: 'IM', text: 'Isle of Man' },
        { value: 'IL', text: 'Israel' },
        { value: 'IT', text: 'Italy' },
        { value: 'JM', text: 'Jamaica' },
        { value: 'JP', text: 'Japan' },
        { value: 'JE', text: 'Jersey' },
        { value: 'JO', text: 'Jordan' },
        { value: 'KZ', text: 'Kazakhstan' },
        { value: 'KE', text: 'Kenya' },
        { value: 'KI', text: 'Kiribati' },
        { value: 'KP', text: 'Korea (Democratic People\'s Republic of)' },
        { value: 'KR', text: 'Korea, Republic of' },
        { value: 'KW', text: 'Kuwait' },
        { value: 'KG', text: 'Kyrgyzstan' },
        { value: 'LA', text: 'Lao People\'s Democratic Republic' },
        { value: 'LV', text: 'Latvia' },
        { value: 'LB', text: 'Lebanon' },
        { value: 'LS', text: 'Lesotho' },
        { value: 'LR', text: 'Liberia' },
        { value: 'LY', text: 'Libya' },
        { value: 'LI', text: 'Liechtenstein' },
        { value: 'LT', text: 'Lithuania' },
        { value: 'LU', text: 'Luxembourg' },
        { value: 'MO', text: 'Macao' },
        { value: 'MG', text: 'Madagascar' },
        { value: 'MW', text: 'Malawi' },
        { value: 'MY', text: 'Malaysia' },
        { value: 'MV', text: 'Maldives' },
        { value: 'ML', text: 'Mali' },
        { value: 'MT', text: 'Malta' },
        { value: 'MH', text: 'Marshall Islands' },
        { value: 'MQ', text: 'Martinique' },
        { value: 'MR', text: 'Mauritania' },
        { value: 'MU', text: 'Mauritius' },
        { value: 'YT', text: 'Mayotte' },
        { value: 'MX', text: 'Mexico' },
        { value: 'FM', text: 'Micronesia (Federated States of)' },
        { value: 'MD', text: 'Moldova (Republic of)' },
        { value: 'MC', text: 'Monaco' },
        { value: 'MN', text: 'Mongolia' },
        { value: 'ME', text: 'Montenegro' },
        { value: 'MS', text: 'Montserrat' },
        { value: 'MA', text: 'Morocco' },
        { value: 'MZ', text: 'Mozambique' },
        { value: 'MM', text: 'Myanmar' },
        { value: 'NA', text: 'Namibia' },
        { value: 'NR', text: 'Nauru' },
        { value: 'NP', text: 'Nepal' },
        { value: 'NL', text: 'Netherlands' },
        { value: 'NC', text: 'New Caledonia' },
        { value: 'NZ', text: 'New Zealand' },
        { value: 'NI', text: 'Nicaragua' },
        { value: 'NE', text: 'Niger' },
        { value: 'NG', text: 'Nigeria' },
        { value: 'NU', text: 'Niue' },
        { value: 'NF', text: 'Norfolk Island' },
        { value: 'MK', text: 'North Macedonia' },
        { value: 'MP', text: 'Northern Mariana Islands' },
        { value: 'NO', text: 'Norway' },
        { value: 'OM', text: 'Oman' },
        { value: 'PK', text: 'Pakistan' },
        { value: 'PW', text: 'Palau' },
        { value: 'PS', text: 'Palestine, State of' },
        { value: 'PA', text: 'Panama' },
        { value: 'PG', text: 'Papua New Guinea' },
        { value: 'PY', text: 'Paraguay' },
        { value: 'PE', text: 'Peru' },
        { value: 'PH', text: 'Philippines' },
        { value: 'PN', text: 'Pitcairn' },
        { value: 'PL', text: 'Poland' },
        { value: 'PT', text: 'Portugal' },
        { value: 'PR', text: 'Puerto Rico' },
        { value: 'QA', text: 'Qatar' },
        { value: 'RE', text: 'Réunion' },
        { value: 'RO', text: 'Romania' },
        { value: 'RU', text: 'Russian Federation' },
        { value: 'RW', text: 'Rwanda' },
        { value: 'BL', text: 'Saint Barthélemy' },
        { value: 'SH', text: 'Saint Helena, Ascension and Tristan da Cunha' },
        { value: 'KN', text: 'Saint Kitts and Nevis' },
        { value: 'LC', text: 'Saint Lucia' },
        { value: 'MF', text: 'Saint Martin (French part)' },
        { value: 'PM', text: 'Saint Pierre and Miquelon' },
        { value: 'VC', text: 'Saint Vincent and the Grenadines' },
        { value: 'WS', text: 'Samoa' },
        { value: 'SM', text: 'San Marino' },
        { value: 'ST', text: 'Sao Tome and Principe' },
        { value: 'SA', text: 'Saudi Arabia' },
        { value: 'SN', text: 'Senegal' },
        { value: 'RS', text: 'Serbia' },
        { value: 'SC', text: 'Seychelles' },
        { value: 'SL', text: 'Sierra Leone' },
        { value: 'SG', text: 'Singapore' },
        { value: 'SX', text: 'Sint Maarten (Dutch part)' },
        { value: 'SK', text: 'Slovakia' },
        { value: 'SI', text: 'Slovenia' },
        { value: 'SB', text: 'Solomon Islands' },
        { value: 'SO', text: 'Somalia' },
        { value: 'ZA', text: 'South Africa' },
        { value: 'GS', text: 'South Georgia and the South Sandwich Islands' },
        { value: 'SS', text: 'South Sudan' },
        { value: 'ES', text: 'Spain' },
        { value: 'LK', text: 'Sri Lanka' },
        { value: 'SD', text: 'Sudan' },
        { value: 'SR', text: 'Suriname' },
        { value: 'SJ', text: 'Svalbard and Jan Mayen' },
        { value: 'SZ', text: 'Sweden' },
        { value: 'CH', text: 'Switzerland' },
        { value: 'SY', text: 'Syrian Arab Republic' },
        { value: 'TW', text: 'Taiwan, Province of China' },
        { value: 'TJ', text: 'Tajikistan' },
        { value: 'TZ', text: 'Tanzania, United Republic of' },
        { value: 'TH', text: 'Thailand' },
        { value: 'TL', text: 'Timor-Leste' },
        { value: 'TG', text: 'Togo' },
        { value: 'TK', text: 'Tokelau' },
        { value: 'TO', text: 'Tonga' },
        { value: 'TT', text: 'Trinidad and Tobago' },
        { value: 'TN', text: 'Tunisia' },
        { value: 'TR', text: 'Turkey' },
        { value: 'TM', text: 'Turkmenistan' },
        { value: 'TC', text: 'Turks and Caicos Islands' },
        { value: 'TV', text: 'Tuvalu' },
        { value: 'UG', text: 'Uganda' },
        { value: 'UA', text: 'Ukraine' },
        { value: 'AE', text: 'United Arab Emirates' },
        { value: 'GB', text: 'United Kingdom' },
        { value: 'US', text: 'United States' },
        { value: 'UY', text: 'Uruguay' },
        { value: 'UZ', text: 'Uzbekistan' },
        { value: 'VU', text: 'Vanuatu' },
        { value: 'VE', text: 'Venezuela' },
        { value: 'VN', text: 'Viet Nam' },
        { value: 'WF', text: 'Wallis and Futuna' },
        { value: 'EH', text: 'Western Sahara' },
        { value: 'YE', text: 'Yemen' },
        { value: 'ZM', text: 'Zambia' },
        { value: 'ZW', text: 'Zimbabwe' },
      ],
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET function
    RESTgetAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .get(path)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // POST function
    RESTcreateAccount(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .post(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Created successfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    // Update function
    RESTupdateAccount(payload, accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Updated successfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    // Delete account
    RESTdeleteAccount(accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Deleted successfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.createAccountForm.country = ""; // Reset country field
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
    },

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit from the browser
      this.$refs.addAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.createAccountForm.name,
        currency: this.createAccountForm.currency,
        country: this.createAccountForm.country, // Include country in payload
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    // Handle submit event for edit account
    onSubmitUpdate(e) {
      e.preventDefault(); //prevent default form submit from the browser
      this.$refs.editAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.editAccountForm.name,
      };
      this.RESTupdateAccount(payload, this.editAccountForm.id);
    },

    // Fill edit account modal
    editAccount(account) {
      this.editAccountForm.id = account.id;
      this.editAccountForm.name = account.name;
    },

    // Delete account
    deleteAccount(account) {
      const confirmation = confirm(
        `Are you sure you want to delete account ${account.name}?`
      );
      if (confirmation) {
        this.RESTdeleteAccount(account.id);
      }
    },
  },

  // Call GET function when component mounted
  mounted() {
    this.RESTgetAccounts();
  },
};
</script>

<style scoped>
.jumbotron {
  background: #f5f5f5;
  padding: 2rem 1rem;
  border-radius: 0.3rem;
}
</style>
