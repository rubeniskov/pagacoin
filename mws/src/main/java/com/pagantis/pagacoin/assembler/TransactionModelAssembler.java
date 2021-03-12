package com.pagantis.pagacoin.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;

import com.pagantis.pagacoin.entity.TransactionEntity;
import com.pagantis.pagacoin.model.TransactionModel;
import com.pagantis.pagacoin.controller.TransactionController;

@Component
public class TransactionModelAssembler extends RepresentationModelAssemblerSupport<TransactionEntity, TransactionModel> {
  public TransactionModelAssembler() {
		super(TransactionController.class, TransactionModel.class);
	}

	@Override
	public TransactionModel toModel(TransactionEntity entity) 
	{
		TransactionModel model = instantiateModel(entity);

		model.add(linkTo(
				methodOn(TransactionController.class)
				.getById(entity.getId()))
				.withSelfRel());
		
    model.setId(entity.getId());
    model.setWalletId(entity.getWalletId());
    model.setSourceId(entity.getSourceId());
    model.setAmount(entity.getAmount());
    model.setStatus(entity.getStatus());
    model.setCdate(entity.getCdate());

		return model;
	}
	
	@Override
	public CollectionModel<TransactionModel> toCollectionModel(Iterable<? extends TransactionEntity> entities) 
	{
		CollectionModel<TransactionModel> models = super.toCollectionModel(entities);
		
    models.add(linkTo(methodOn(TransactionController.class).getAll()).withRel("transactions"));
		models.add(linkTo(methodOn(TransactionController.class).getAll()).withSelfRel());
		
		return models;
	}

	// private List<ActorModel> toActorModel(List<ActorEntity> actors) {
	// 	if (actors.isEmpty())
	// 		return Collections.emptyList();

	// 	return actors.stream()
	// 			.map(actor -> ActorModel.builder()
	// 					.id(actor.getId())
	// 					.firstName(actor.getFirstName())
	// 					.lastName(actor.getLastName())
	// 					.build()
	// 					.add(linkTo(
	// 							methodOn(WebController.class)
	// 							.getActorById(actor.getId()))
	// 							.withSelfRel()))
	// 			.collect(Collectors.toList());
	// }
}
