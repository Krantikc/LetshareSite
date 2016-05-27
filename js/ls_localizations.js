angular.module('Letshare').factory('svLocale', ['$stateParams', '$state', '_',
    function($stateParams, $state, _) {
        var factory = {};
        var locales = [
            {value: 'en-us', title: 'English'},
            {value: 'ko-kr', title: '한국어'}
        ];
        var contentList = {
            //Menu
            'home': {
                'en-us': 'Home',
                'ko-kr': '지도'
            },
            'health' : {
                'en-us': 'Health',
                'ko-kr': '지도'
            },
            'closeBtn' : {
                'en-us': 'Close',
                'ko-kr': '지도'
            },
            'submitBtn' : {
                'en-us': 'Submit',
                'ko-kr': '지도'
            },
            'login' : {
                'en-us': 'Login',
                'ko-kr': '지도'
            },
            'register' : {
                'en-us': 'Register',
                'ko-kr': '지도'
            }
        };

        factory.selectedLanguage = locales[0];
        for (var i = 0; i < locales.length; i++) {
            if (locales[i].value.substring(0, 2) === $stateParams.lang) {
                factory.selectedLanguage = locales[i];
                break;
            }
        }

        factory.setSelectedLanguage = function(selected) {
            if (selected && factory.selectedLanguage !== selected) {
                factory.selectedLanguage = selected;
                $stateParams.lang = factory.selectedLanguage.value.substring(0, 2);
                $state.go($state.$current, null, {reload: true});
            }
        };

        factory.getSelectedLanguage = function() {
            return factory.selectedLanguage;
        };

        factory.getLocales = function() {
            return locales;
        };

        factory.translate = function(content, lang) {
            if (!lang) {
                lang = factory.selectedLanguage.value;
            }

            if (contentList.hasOwnProperty(content) &&
                contentList[content].hasOwnProperty(lang)) {
                return contentList[content][lang];
            } else {
                return null;
            }
        };

        // Returns the key for specified value, ie. value of "Top 10" would return "top10"
        factory.getKeyForValue = function(value, lang) {
            if (!value) {
                return null;
            }

            if (!lang) {
                lang = 'en-us';
            }

            var pair = _.find(contentList, function(content) {
                return content[factory.selectedLanguage.value] === value;
            });

            if (pair) {
                return pair[lang];
            } else {
                return null;
            }
        };

        return factory;
    }
]);
