import * as dataService from '../services/dataService.js';

export const deleteView = async (ctx) => {
    await dataService.del(ctx.params.id);

    ctx.page.redirect('/catalog');
}