const exp_reg = {
  img_exp: /(\.|\/)(jpe?g|png|webp)$/i,
  name_exp: /^[a-zA-ZÁ-ÿ-,-.-"-'-0-9\s]{0,50}$/,
  pass_exp: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/,
  email_exp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  budget_exp: /^[,-.-0-9\s]{0,12}$/,
};

export default exp_reg;
