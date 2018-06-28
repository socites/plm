function Relations(attributes, session, specs) {

    specs = (specs) ? specs : {};

    let Collection = module.plm.Collection;
    new Collection(this, {
        'attributes': attributes,
        'session': session,
        'batch': specs.batch
    });

}
