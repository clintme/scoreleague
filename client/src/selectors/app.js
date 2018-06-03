import { Seq } from 'immutable';
import { createSelector } from 'reselect';

/*
 ***********************************************************************
 * Dropdown Array Selector                                                             *
 ***********************************************************************
 *
 * @param { state } `Immutable` object.
 * @param { data } `Object` is data to filter.
 * @param { params } `string` field of immutable object.
 * return { state } will return the final state value.
 */
const dropDownSelector = (state, params) => {
  let lists = state.get(params);

  lists = lists.reduce((curr, next) => {
    curr.push({ val: next.get('id'), name: next.get('name') });

    return curr;
  }, []);

  return lists;
};
export const dropDownDataSelector = createSelector(
  [dropDownSelector],
  data => data,
);

/*
 ***********************************************************************
 * Filter Selector                                                             *
 ***********************************************************************
 *
 * @param { state } `Immutable` object.
 * @param { data } `Object` is data to filter.
 * @param { params } `Object` which consist the following keys.
 *      @param { loc } `String` to get a value within a structure of data.
 *      @param { field_item } `String` a conditional field to filter.
 *      @param { field_value } `String` a conditional field to filter.
 * return { state } will return the final state value.
 */
const filterSelector = (state, params) => {
  let lists = state.get(params.loc);
  lists = lists.filter(
    item => item.get(params.field_item) !== params.field_value,
  );

  return lists;
};
export const filterDataSelector = createSelector(
  [filterSelector],
  data => data,
);

/*
 ***********************************************************************
 * AddItem                                                             *
 ***********************************************************************
 *
 * @param { state } `Immutable` object.
 * @param { params } `Array` which consist the following keys.
 * @param { item } `Object` is an item to be added.
 *
 * return { state } will return the final state value.
 */
const addItem = (state, params, item) =>
  state.updateIn(params, arrItem => arrItem.push(Seq(item).toMap()));
export const addItemSelector = createSelector([addItem], data => data);

/*
 ***********************************************************************
 * RemoveItem                                                          *
 ***********************************************************************
 *
 * @param { state } `Immutable` object.
 * @param { params } `Array` which consist the following keys.
 * @param { selectedItemId } `id` specific field to be filtered out.
 *
 * return { state } will return the final state value.
 */
const removeItem = (state, params, selectedItemId) => {
  let getData = state.getIn(params);
  if (getData) {
    getData = getData.filter(items => items.get('id') !== selectedItemId);
  }

  return state.setIn(params, getData);
};
export const removeItemSelector = createSelector([removeItem], data => data);


/*
 ***********************************************************************
 * UpdateItem                                                          *
 ***********************************************************************
 *
 * @param { state } `Immutable` object.
 * @param { params } `Array` which consist the following keys.
 * @param { selectedItemId } `id` specific field to be filtered out.
 *
 * return { state } will return the final state value.
 */
const updateItem = (state, params, selectedItemId, item, value) => {
  let getData = state.getIn(params);

  if (getData) {
    getData = getData.reduce((state, next) => { // eslint-disable-line
      if (selectedItemId === next.get('id')) {
        next = next.set(item, value); // eslint-disable-line
      }

      state.push(next);

      return state;
    }, []);
  }

  return state.setIn(params, getData);
};
export const updateItemSelector = createSelector([updateItem], data => data);
