const { User, Role } = require("../models/index");
const ValidationError = require("../utils/Validation-error");

class UserRepository {
  async create(data) {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const user = await User.create(userData);
      const role = user.toJSON();
      await Role.create({
        Userid: role.id,
        RoleCode: data.role,
      });
      console.log(user.toJSON());
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
  async findRoleByUserId(userId) {
    try {
      const role = await Role.findOne({
        where: { Userid: userId },
      });
      if (role) {
        console.log("Role found:", role.toJSON());
        return role;
      } else {
        console.log("Role not found for UserId:", userId);
      }
    } catch (error) {
      console.error("Error finding role:", error);
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
