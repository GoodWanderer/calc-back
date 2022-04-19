  //! Различные пупапы
  const colorsImg = document.querySelectorAll('.colors-preview__img'),
        mPopup = document.querySelector('.popup-zoom'),
        body = document.querySelector('body');
  
  colorsImg.forEach(color => {
    color.addEventListener('click', () => {
      mPopup.querySelector('img').src = color.querySelector('img').src;
      mPopup.classList.remove('off');
      body.classList.add('_lock');
    })
  });
  
  mPopup.querySelector('.popup-zoom__body').addEventListener('click', (e) => {
    if (!e.target.closest('.popup-zoom__img')) {
      mPopup.classList.add('off');
      body.classList.remove('_lock');
    }
  })
  
  mPopup.querySelector('.popup-zoom__close').addEventListener('click', () => {
    mPopup.classList.add('off');
    body.classList.remove('_lock');
  });
  
  const backConstValue = {
    wire: [
      {
        coil: 50,
        price: 100,
        percentages: 10,
      },
      {
        coil: 50,
        price: 110,
        percentages: 10,
      },
      {
        coil: 50,
        price: 120,
        percentages: 10,
      },
      {
        coil: 50,
        price: 130,
        percentages: 10,
      },
      {
        coil: 50,
        price: 140,
        percentages: 10,
      },
      {
        coil: 50,
        price: 150,
        percentages: 10,
      },
      {
        coil: 46,
        price: 100,
        percentages: 15,
      },
      {
        coil: 46,
        price: 110,
        percentages: 15,
      },
    ],
    insulators: {
      plastic: [
        {
          price: 20,
        },
        {
          price: 21,
        },
        {
          price: 22,
        },
        {
          price: 23,
        },
      ],
      porcelain: [
        {
          price: 10,
        }
      ]
    },
    bushings: [
      {
        price: 31,
      },
      {
        price: 32,
      },
      {
        price: 33,
      },
      {
        price: 34,
      },
      {
        price: 35,
      },
      {
        price: 36,
      }
    ]
  }
  
  const onChangeActiveСheckbox = (arr, el) => {
    arr.forEach(item => {
      item.classList.remove('_active')
    });
    el.classList.add('_active');
  }
  
  // ! Выбор Изоляторов 
  const insulatorsBlock = document.querySelector('.insulators-settings-order-wires__color-block'), 
        insulatorsCheck = document.querySelector('.insulators-settings-order-wires__checkbox span');
  
  const insulatorsVariants = document.querySelectorAll('.insulators-settings-order-wires__border')
  const insulatorsColors = document.querySelectorAll('.insulators-settings-order-wires__colors')
  
  const insulatorsItems = document.querySelectorAll('.insulators-settings-order-wires-item');
  
  const insulatorsItems1 = insulatorsColors[0].querySelectorAll('.insulators-settings-order-wires-item'),
        insulatorsItems2 = insulatorsColors[1].querySelectorAll('.insulators-settings-order-wires-item');
  
  
  let useInsulatorsBlock = false,
      useInsulatorsVariants = 0,
      useInsulatorsItems = 0;
  
  try {
    insulatorsCheck.addEventListener('click', () => {
      if (!insulatorsBlock.classList.contains('_active')) {
        onChangeActiveСheckbox(insulatorsItems, insulatorsItems[0])
        insulatorsVariants[1].classList.remove('_active');
        insulatorsColors[1].classList.remove('_active');
        insulatorsVariants[0].classList.add('_active');
        insulatorsColors[0].classList.add('_active');
        useInsulatorsBlock = true;
      } 
      else {
        useInsulatorsBlock = false;
        useInsulatorsVariants = 0;
        useInsulatorsItems = 0;
      }
      insulatorsBlock.classList.toggle('_active');
      updateTotalPrice();
    })
  
    insulatorsVariants[0].addEventListener('click', () => {
      insulatorsVariants[1].classList.remove('_active');
      insulatorsColors[1].classList.remove('_active');
      
      insulatorsVariants[0].classList.add('_active');
      insulatorsColors[0].classList.add('_active');
  
      useInsulatorsVariants = 0;
      useInsulatorsItems = 0;
  
      onChangeActiveСheckbox(insulatorsItems, insulatorsItems[0]);
  
      updateTotalPrice();
    })
    
    insulatorsVariants[1].addEventListener('click', () => {
      insulatorsVariants[0].classList.remove('_active');
      insulatorsColors[0].classList.remove('_active');
      
      insulatorsVariants[1].classList.add('_active');
      insulatorsColors[1].classList.add('_active');
  
      useInsulatorsVariants = 1;
      useInsulatorsItems = 0;
  
      onChangeActiveСheckbox(insulatorsItems, insulatorsItems[insulatorsItems1.length]);
  
      updateTotalPrice();
    })
  
  
    insulatorsItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        onChangeActiveСheckbox(insulatorsItems, insulatorsItems[i])
        if (useInsulatorsVariants === 0)
          useInsulatorsItems = i;
        else {
          useInsulatorsItems = i - insulatorsItems1.length;
        }
        updateTotalPrice();
      })
    });
  
  } 
  catch (e) {
    console.log(`Ошибка в блоке Активация выбора изолятора\n${e}`);
  }
  
  
  // ! Выбор втулок
  const bushingsBlock = document.querySelector('.bushings-settings-order-wires__color-block'), 
        bushingsCheck = document.querySelector('.bushings-settings-order-wires__checkbox span');
  
  const bushingsItems = document.querySelectorAll('.bushings-settings-order-wires-item');
  
  const bushingsAdd = document.querySelector('.bushings-settings-order-wires__add'),
        bushingsQuantity = document.querySelector('.bushings-settings-order-wires__quantity'),
        bushingsRemove = document.querySelector('.bushings-settings-order-wires__remove');
  
  let useBushingsBlock = false,
      useBushingsItems = 0;
  
  try {
    bushingsCheck.addEventListener('click', () => {
      if (!bushingsBlock.classList.contains('_active')) {
        onChangeActiveСheckbox(bushingsItems, bushingsItems[0])
        bushingsQuantity.value = 5;
        useBushingsBlock = true;
        useBushingsItems = 0;
      } else {
        useBushingsBlock = false;
      }
      bushingsBlock.classList.toggle('_active');
      updateTotalPrice();
    })
  
    bushingsAdd.addEventListener('click', () => {
      bushingsQuantity.value++;
      updateTotalPrice();
    })
  
    bushingsQuantity.addEventListener('blur', () => {
      if (bushingsQuantity.value === '' || bushingsQuantity.value < 1) {
        bushingsQuantity.value = 5;
      }
      updateTotalPrice();
    })
  
    bushingsRemove.addEventListener('click', () => {
      if (bushingsQuantity.value > 1) {
        bushingsQuantity.value--;
        updateTotalPrice();
      }
    })
  
    bushingsItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        onChangeActiveСheckbox(bushingsItems, item);
        useBushingsItems = i;
        updateTotalPrice();
      })
    });
  
  } 
  catch (e) {
    console.log(`Ошибка в блоке Активация выбора втулок\n${e}`);
  }
  
  // ! Основные компоненты
  // Активация
  const componentsItems = document.querySelectorAll('.order-wires-component__num'),
        componentsСheck = document.querySelectorAll('.order-wires-component__checkbox span');
  // Добавить
  const componentsAdd = document.querySelectorAll('.order-wires-component__add')
  // Количество
  const componentsQuantity = document.querySelectorAll('.order-wires-component__quantity')
  // Отнять
  const componentsRemove = document.querySelectorAll('.order-wires-component__remove')
  
  let componentsArr = [];
  
  componentsСheck.forEach((item, i) => {
    item.addEventListener('click',() => {
      if (!componentsItems[i].classList.contains('_active')) {
        componentsQuantity[i].value = 5;
        componentsArr.push({id: i, q: componentsQuantity[i].value})
      } else {
        componentsArr = componentsArr.filter(jtem => {
          if (jtem.id !== i) {
            return jtem;
          } 
        });
      }
      componentsItems[i].classList.toggle('_active');
      updateTotalPrice();
    })
  });
  
  componentsAdd.forEach((item, i) => {
    item.addEventListener('click', () => {
      componentsQuantity[i].value++;
      componentsArr = componentsArr.map((jtem) => {
        if (jtem.id === i) {
          return {...jtem, q: componentsQuantity[i].value}
        }
        return jtem;
      });
      updateTotalPrice();
    })
  });
  
  componentsQuantity.forEach((item, i) => {
    item.addEventListener('blur', () => {
      if (item.value === '' || item.value < 1)
        item.value = 5;
      componentsArr = componentsArr.map((jtem) => {
        if (jtem.id === i) {
          return {...jtem, q: item.value}
        }
        return jtem;
      });
      updateTotalPrice();
    })
  });
  
  componentsRemove.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (componentsQuantity[i].value > 1)
        componentsQuantity[i].value--;
        componentsArr = componentsArr.map((jtem) => {
          if (jtem.id === i) {
            return {...jtem, q: componentsQuantity[i].value}
          } 
          return jtem;
        });
      updateTotalPrice();
    })
  });
  
  
  // ! Цена
  const priceBlock = document.querySelector('.settings-order-wires__sum');
  let totalPrice = 0;
  
  let totalInsulatorsQ;
  let totalInsulatorsPrice;
  
  const updateTotalPrice = () => { 
    totalPrice = 0 
  
    totalInsulatorsQ = 0;
    totalInsulatorsPrice = 0;
  
    componentsArr.forEach((item, i) => {
      let full = item.q / backConstValue.wire[item.id].coil;
      let part = item.q % backConstValue.wire[item.id].coil;
      let price = 0; 
      for (let j = 0.99; j < full; j++) {
        price += backConstValue.wire[item.id].coil * backConstValue.wire[item.id].price;
      }
      price += Number((part * backConstValue.wire[item.id].price * (1+backConstValue.wire[item.id].percentages/100)).toFixed(2));
      componentsArr[i] = {...item, total: price}
  
      totalPrice += price;
      
      if (useInsulatorsBlock != false) {
        let tPrice = 0;
        switch(useInsulatorsVariants) {
          case 0:
            tPrice += item.q * 3 * backConstValue.insulators.plastic[useInsulatorsItems].price;
            break;
          case 1:
            console.log(useInsulatorsItems, insulatorsItems1.length);
            tPrice += item.q * 3 * backConstValue.insulators.porcelain[useInsulatorsItems].price;
            break
        }
        totalInsulatorsPrice += tPrice;
        totalInsulatorsQ += item.q * 3;
  
        totalPrice += tPrice;
      }
    });
  
    if (useBushingsBlock) {
      totalPrice += bushingsQuantity.value * backConstValue.bushings[useBushingsItems].price;
    }
  
    priceBlock.textContent = `${Math.ceil(totalPrice)} руб`;
  }
  
  // !Форма 
  
  const fPopup = document.querySelector('.popup-form');
  
  const btnAdd = document.querySelector('.settings-order-wires__buy-btn');
  
  const dataWrapper = document.querySelector('.details-popup-form-body__info'),
        totalPopup = document.querySelector('.details-popup-form-footer__total');
  
  const wireNames = document.querySelectorAll('.order-wires-component__name');
  
  btnAdd.addEventListener('click', () => {
    if (totalPrice != 0) {
      fPopup.classList.remove('off');
      body.classList.add('_lock');
  
      for (let i = 0; i < componentsArr.length; i++) {
        let div = document.createElement('div');
        div.classList.add('details-popup-form-body__article');
        div.innerHTML = `
          <span class="details-popup-form-body__title">Провод ретро витой</span>
          <span class="details-popup-form-body__q">${wireNames[i].textContent}:</span>
          <span class="details-popup-form-body__q">${componentsArr[i].q}</span>
          <span>(шт)</span>
          <span class="details-popup-form-body__separator">=</span>
          <span class="details-popup-form-body__price">${componentsArr[i].total}</span>
          <span>р.</span>
        `
        dataWrapper.appendChild(div)
      }
      
      if (useInsulatorsBlock) {
        let div1 = document.createElement('div');
        div1.classList.add('details-popup-form-body__article');
        div1.innerHTML = `
          <span class="details-popup-form-body__title">Изоляторы</span>
          <span class="details-popup-form-body__q">${useInsulatorsVariants==0?'пластиковые':'фарфоровые'} № ${useInsulatorsItems + 1}:</span>
          <span class="details-popup-form-body__q">${totalInsulatorsQ}</span>
          <span>(шт)</span>
          <span class="details-popup-form-body__separator">=</span>
          <span class="details-popup-form-body__price">${totalInsulatorsPrice}</span>
          <span>р.</span>
        `
        dataWrapper.appendChild(div1)
      }
  
      if (useBushingsBlock) {
        let div2 = document.createElement('div');
        div2.classList.add('details-popup-form-body__article');
        div2.innerHTML = `
          <span class="details-popup-form-body__title">Проходные втулки</span>
          <span class="details-popup-form-body__q">№ ${useBushingsItems+1}:</span>
          <span class="details-popup-form-body__q">${bushingsQuantity.value}</span>
          <span>(шт)</span>
          <span class="details-popup-form-body__separator">=</span>
          <span class="details-popup-form-body__price">${bushingsQuantity.value * backConstValue.bushings[useBushingsItems].price}</span>
          <span>р.</span>
        `
        dataWrapper.appendChild(div2)
      }
  
      totalPopup.textContent = totalPrice;
    }
  })
  