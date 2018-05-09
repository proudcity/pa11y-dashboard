// This file is part of Pa11y Dashboard.
//
// Pa11y Dashboard is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pa11y Dashboard is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pa11y Dashboard.  If not, see <http://www.gnu.org/licenses/>.
'use strict';

const standardsArray = require('../../data/standards')();
const techs = require('../../data/techniques')();
const rules = createStandardDescriptionMap(standardsArray);

module.exports = presentPassedRules;

function presentPassedRules(passed) {
  return passed.filter(name => rules[name]).map(name => {
    return {
      name: rules[name].label,
      description: rules[name].description,
      solutions: rules[name].solutions,
    };
  });
}

function createStandardDescriptionMap(standards) {
  const map = {};
  standards.forEach(standard => {
    standard.rules.forEach(rule => {
      map[rule.name.toLowerCase()] = {
        label: rule.name,
        description: rule.description
      };
      const data = rule.name.split('.');
      data.splice(0, 4);
      const techniques = data.join('.').split(',').map(code => code.split('.')[0]);
      // console.log(techniques);
      map[rule.name.toLowerCase()].solutions = techniques.reduce((prev, technique) => {
        if (techs[technique] && techs[technique].title) {
          prev.push({
            title: techs[technique].title || null,
            url: techs[technique].url || null
          });
        }
        return prev;
      }, []);
      console.log(map[rule.name.toLowerCase()].solutions);
    });
  });
  return map;
}
