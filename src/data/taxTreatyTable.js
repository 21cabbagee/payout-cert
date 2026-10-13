export const TAX_TREATY_TABLE = {
  GB: {
    country: "United Kingdom",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits) / Article 14",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "UTR / National Insurance Number",
    ftinExample: "12345 67890",
    conditionsText: "Independent personal services performed by resident of the United Kingdom with no permanent US establishment."
  },
  DE: {
    country: "Germany",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "Steuer-Identifikationsnummer (TIN)",
    ftinExample: "12 345 678 901",
    conditionsText: "Independent contracting services performed by German tax resident without a permanent US establishment."
  },
  CA: {
    country: "Canada",
    hasTreaty: true,
    treatyArticle: "Article VII (Business Profits)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "Social Insurance Number (SIN) / BN",
    ftinExample: "123-456-789",
    conditionsText: "Services rendered without maintaining a permanent establishment in the United States."
  },
  IN: {
    country: "India",
    hasTreaty: true,
    treatyArticle: "Article 15 (Independent Personal Services)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "Permanent Account Number (PAN)",
    ftinExample: "ABCDE1234F",
    conditionsText: "Individual professional services provided without a fixed base in the United States for >90 days."
  },
  FR: {
    country: "France",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "Numéro Fiscal (SPI)",
    ftinExample: "12 34 56 789 012",
    conditionsText: "Independent freelance services performed by a resident of France."
  },
  UA: {
    country: "Ukraine",
    hasTreaty: true,
    treatyArticle: "Article 14 (Independent Personal Services)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "RNOKPP / IPN (Tax ID)",
    ftinExample: "1234567890",
    conditionsText: "Software engineering and consulting services rendered outside the United States."
  },
  PH: {
    country: "Philippines",
    hasTreaty: true,
    treatyArticle: "Article 15 (Independent Personal Services)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "Taxpayer Identification Number (TIN)",
    ftinExample: "123-456-789-000",
    conditionsText: "Independent contractor services rendered without maintaining a fixed base in the US."
  },
  AU: {
    country: "Australia",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits) / Article 14",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "Tax File Number (TFN) / ABN",
    ftinExample: "123 456 789",
    conditionsText: "Independent professional services performed by an Australian tax resident."
  },
  JP: {
    country: "Japan",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "My Number (Individual Number)",
    ftinExample: "1234-5678-9012",
    conditionsText: "Freelance technical services performed by resident of Japan."
  },
  BR: {
    country: "Brazil",
    hasTreaty: false,
    treatyArticle: "Non-US Source Income (IRC § 861/862)",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "CPF / CNPJ",
    ftinExample: "123.456.789-00",
    conditionsText: "Certified that 100% of services are physically performed outside the US; income is not US-sourced."
  },
  PL: {
    country: "Poland",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits) / Article 15",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "PESEL / NIP",
    ftinExample: "1234567890",
    conditionsText: "Independent software development services performed without fixed base in the US."
  },
  MX: {
    country: "Mexico",
    hasTreaty: true,
    treatyArticle: "Article 7 (Business Profits) / Article 14",
    withholdingRate: "0%",
    defaultRate: "30%",
    ftinName: "RFC (Registro Federal de Contribuyentes)",
    ftinExample: "VECJ880326XXX",
    conditionsText: "Professional services rendered by Mexican tax resident."
  }
};
