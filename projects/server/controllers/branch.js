const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../models");
const branch = db.Branch;
const rajaOngkirKey = process.env.RAJA_KEY;
const openCageKey = process.env.GEO_KEY;

module.exports = {
  findAll: async (req, res) => {
    try {
      const branch = await branch.findAll({
        attributes: ["id", "branchName"],
      });
      res.status(200).send(branch);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  setBranch: async (req, res) => {
    try {
      const { id } = req.params;
      const findBranch = await branch.findOne({
        where: {
          //   defaultAddress: true,
          id: req.user.id,
        },
      });
      if (findBranch) {
        await branch.update(
          {
            // defaultAddress: false,
          },
          {
            where: {
              id: findBranch.id,
            },
          }
        );
        await branch.update(
          {
            // defaultAddress: true,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({
          message: "success",
        });
      }
      if (!findBranch) {
        await branch.update(
          {
            defaultAddress: true,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({
          message: "success",
        });
      }
      res.status(200).json({
        message: "set as branch",
        data: findBranch,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteBranch: async (req, res) => {
    try {
      const { id } = req.params;
      await branch.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        message: "Branch deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  branchById: async (req, res) => {
    try {
      const { branchName = "", address = "" } = req.query;
      if (branchName || address) {
        const res = await address.findAll({
          where: {
            // UserId: req.user.id,
            [Op.or]: {
              branchName: {
                [Op.like]: `%${branchName}%`,
              },
              address: {
                [Op.like]: `${address}%`,
              },
            },
          },
          //   order: [["defaultAddress", "DESC"]],
        });
        // res.status(200).send({
        //   message: "Get user Address by name and full Address",
        //   data: res,
        // });
      }
      const response = await branch.findAll({
        where: {
          // UserId: req.user.id,
        },
        // order: [["defaultAddress", "DESC"]],
      });
      return res.status(200).send({
        message: "Get Branch Address",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  createBranch: async (req, res) => {
    try {
      const { branchName, address, city, province, postalCode, phoneNumber } =
        req.body;
      const provinceAndCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );
      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;

      // const findAddress = await address.findOne({
      //   where: {
      //     UserId: req.user.id,
      //   },
      // });

      // if (!findAddress) {
      //   const response = await address.create({
      //     receiverName,
      //     receiverPhone,
      //     addressLine,
      //     provinceId: province,
      //     province: provinceName,
      //     cityId: city,
      //     city: cityNameAndType,
      //     postalCode,
      //     detail,
      //     district,
      //     lattitude,
      //     longitude,
      //     defaultAddress: true,
      //     // UserId: req.user.id,
      //   });
      //   res.status(200).json({
      //     message: "New address",
      //     data: response,
      //   });
      // }
      const response = await branch.create({
        branchName,
        address,
        provinceId: province,
        province: provinceName,
        cityId: city,
        city: cityNameAndType,
        postalCode,
        lattitude,
        longitude,
        phoneNumber,
        // UserId: req.user.id,
      });
      res.status(200).json({
        message: "New address",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  updateBranch: async (req, res) => {
    try {
      const { branchName, address, province, city, postalCode } = req.body;
      const { id } = req.params;
      const provinceAndCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );
      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;
      await branch.update(
        {
          branchName,
          address,
          provinceId: province,
          province: provinceName,
          cityId: city,
          city: cityNameAndType,
          postalCode,
          lattitude,
          longitude,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const findData = await branch.findByPk(id);
      res.status(200).json({
        message: "Address edited",
        data: findData,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
