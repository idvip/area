//选择省市县模块
//依赖linq.js、areadata.js
(function (obj) {
    var datas = getAreaData();
    function loadProvince(obj) {
        if (obj) {
            datas.province.each(function () {
                obj.options.add(new Option(this.name, this.ProID));
            });
            obj.onchange();
        }
    }
    function loadCity(obj,provinceId) {
        if (obj) {
            obj.options.length = 0;
            datas.city.where(function () { return this.ProID == provinceId }).each(function () {
                obj.options.add(new Option(this.name, this.CityID));
            });
            obj.onchange();
        }
        
    }
    function loadCounty(obj,cityId) {
        if (obj) {
            obj.options.length = 0;
            datas.county.where(function () {return this.CityID == cityId }).each(function () {
                obj.options.add(new Option(this.DisName, this.Id));
            });
        }
    }
    //初始化数据
    obj.initArea = function (provinceId, cityId, countyId,provinceValue,cityValue,countyValue) {
        var pele=null,cele=null,oele=null;
        //绑定事件
        if (provinceId) {
            pele = document.getElementById(provinceId);
            pele.onchange = function () {
                loadCity(cele, pele.value);
            }
        }
        if (cityId) {
            cele = document.getElementById(cityId);
            cele.onchange = function () {
                loadCounty(oele, cele.value);
            }
        }
        if (countyId) {
            oele = document.getElementById(countyId);
        }
        loadProvince(pele);
        loadCity(cele, pele.value);
        if (provinceValue) {
            pele.value = provinceValue;
            loadCity(cele, provinceValue);
            if (cityValue) {
                cele.value = cityValue;
                loadCounty(oele, cityValue);
                if (countyValue) {
                    oele.value = countyValue;
                }
            }
        }
    }

})(window);