function Students(attributes, session) {

    let Collection = module.plm.Collection;
    new Collection(this, attributes, {'session': session});

}
