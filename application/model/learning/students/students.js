function Students(attributes, session) {

    console.log("Model Attributes", attributes);

    let Collection = module.plm.Collection;
    new Collection(this, attributes, {'session': session});

}
