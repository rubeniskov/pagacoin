package com.pagantis.pagacoin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.CustomConversions;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.util.List;
import java.util.ArrayList;

import com.pagantis.pagacoin.converter.TransactionWriteConverter;

@Configuration
public class AppMongoConfig {
    @Autowired private MongoDatabaseFactory mongoDbFactory;

    @Autowired private MongoMappingContext mongoMappingContext;

    @Bean
    public MappingMongoConverter mappingMongoConverter() {
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDbFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
        List<Converter<?, ?>> converters = new ArrayList<>();
        converters.add(new TransactionWriteConverter());
        converter.setCustomConversions(new org.springframework.data.mongodb.core.convert.CustomConversions(converters));
        

        converter.setTypeMapper(new DefaultMongoTypeMapper(null));

        return converter;
    }
}
